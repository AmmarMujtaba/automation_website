import { useEffect, useState } from 'react';
import './App.css';
import {exBtnClicked} from './client.js'
import Fan from './components/fan.js';
import { Realtime } from 'ably';

function App() {
  const [status, setStatus] = useState({})
  
  async function ablyHandler(){
    console.log('inside handler')
    const ably = new Realtime('gf7lDA.lZTm9A:OO2S5MaOGvSDbF5_atGjC6_B9UGlwqnbEEYR1OmHWFA')
    await ably.connection.once('connected')
    console.log('ably is connected')
  
    const channel = await ably.channels.get('roomautomation')
    console.log('channel created')
  
    await channel.subscribe('arduino',(message) => {
      console.log('message: ',message.data)
      if(message.data === 'btnOn'){
        setStatus((prev) => {
          if(prev.isBtnOn === '0'){
            return{
              ...prev,
              isBtnOn: '1'
            }
          }
          else if(prev.isBtnOn === '1'){
            console.log('button already on')
          }
        })
      }
      else if(message.data === 'btnOff'){
        setStatus((prev) => {
          if(prev.isBtnOn === '1'){
            return{
              ...prev,
              isBtnOn: '1'
            }
          }
          else if(prev.isBtnOn === '0'){
            console.log('button already off')
          }
        })
      }
      else if(message.data === 'manualFanOn'){
        setStatus((prev) => {
          if(prev.isAuto === '0'){
            if(prev.isFanOn === '0'){
              return {
                ...prev,
                isFanOn: '1'
              }
            }
            else{
              console.log('fan already on')
              return prev
            }
          }
          else if(prev.isAuto === '1'){
            console.log('can\'t handle fan manually in auto mode')
            return prev
          }
        })
      }
      else if(message.data === 'manualFanOff'){
          setStatus((prev) => {
            if(prev.isAuto === '0'){
              if(prev.isFanOn === '1'){
                return {
                  ...prev,
                  isFanOn: '0'
                }
              }
              else{
                console.log('fan already off')
                return prev
              }
            }
            else if(prev.isAuto === '1'){
              console.log('can\'t handle fan manually in auto mode')
              return prev
            }
          })
      }
    })
  }
  function chModeBtnClicked(){
    console.log('inside reqstat handler')
    fetch('https://as-server-orpin.vercel.app/changemode')
    .then((response) => {
        return response.text()
    })
    .then((data) => {
      setStatus((prev) => ({
        ...prev,
        isAuto: ((data == 'modeAuto')?'1':(data == 'modeManual')?'0':'error')
      }))
      console.log('response: ',data)
  })
  }
  async function request(){
    console.log('inside useEffect')
    const response = await fetch('https://as-server-orpin.vercel.app/reqstat')
    const text = await response.text()
    console.log('reqStat response: ',text)

    setStatus((prevState) => ({
      ...prevState,
      isFanOn: text[0],
      isBtnOn: text[1],
      isAuto: text[2]
    }))
    console.log('status changed')
  }

  useEffect(() => {request();ablyHandler();},[])

  return (
    <>
      {(Object.values(status).length > 0)?(
        <div>
          <p id='isAuto'>The mode is <b>{(status.isAuto === '1')?"Auto":"Manual"}</b></p>
          <Fan status = {status} setStatus = {setStatus}/>
          <button onClick={exBtnClicked}>Example</button>
          <button onClick={chModeBtnClicked}>ChangeMode</button>
        </div>
      ):(
      <div>
        <h1>Loading...</h1>
      </div>
      )}
    </>
  );
}

export default App;
