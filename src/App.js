import { useEffect, useState } from 'react';
import './App.css';
import {exBtnClicked} from './client.js'
import Fan from './components/fan.js';
import io from 'socket.io-client'

const socket = io('https://as-server-orpin.vercel.app:5555')

function App() {
  const [status, setStatus] = useState({})

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
      console.log('isAuto: ',status.isAuto)
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
  useEffect(() => {
    request()
    socket.on('connect',() => {
      socket.on('established', (data) => {
        console.log('server is connected, data: ',data)
      })
    })
  },[])

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
