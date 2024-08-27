import { useEffect, useState } from 'react';
import './App.css';
import {exBtnClicked,chModeBtnClicked} from './client.js'
import Fan from './components/fan.js';


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
          isAuto: () => {
            if(data == 'modeAuto'){
              return '1'
            }
            else if(data == 'modeManual'){
              return '0'
            }
          }
        }))
        console.log('response: ',data)
    })
}
  async function request(){
    console.log('inside useEffect')
    const response = await fetch('https://as-server-orpin.vercel.app/reqstat')
    const text = await response.text()
    console.log('reqStat response: ',text)

    console.log('changing status')
    setStatus((prevState) => ({
        ...prevState,
        isFanOn: text[0],
        isBtnOn: text[1],
        isAuto: text[2]
    }))
  }
  useEffect(() => {request()},[])

  return (
    <>
      {() => {
        console.log('n of values',Object.values(status))
        if(Object.values(status) > 0){
          return(
            <div>
              <p id='isAuto'>The mode is <b>{status.isAuto === '1'?"Auto":"Manual"}</b></p>
              <Fan status = {status} setStatus = {setStatus}/>
              <button onClick={exBtnClicked}>Example</button>
              <button onClick={chModeBtnClicked}>ChangeMode</button>
            </div>
          )
        }
        else{
          return (
            <div>
              <h1>Loading...</h1>
            </div>
          )
        }
      }}
    </>
  );
}

export default App;
