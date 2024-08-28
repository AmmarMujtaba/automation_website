import { useEffect, useState } from 'react';
import './App.css';
import {exBtnClicked,chModeBtnClicked} from './client.js'
import Fan from './components/fan.js';

let socket = []
socket.onopen = () => {
  console.log('connection established')
  socket.send('client: connected')
}
socket.onmessage = (event) => {
  console.log('message: ',event.data)
}
socket.onclose = (event) => {
  console.log('connection closed ',event)
}
socket.onerror = (error) => {
  console.log('error: ',error)
}

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
    socket = new WebSocket('ws://as-server-orpin.vercel.app:5555')
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
