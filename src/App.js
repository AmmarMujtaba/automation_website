import { useEffect, useState } from 'react';
import './App.css';
import {OnBtnClicked,OffBtnClicked,reqStatBtnClicked,exBtnClicked,chModeBtnClicked} from './client.js'

function App() {
  const [status, setStatus] = useState({})

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
  useEffect(() => {
    request()
  },[])

  return (
    <>
      <p id='isFanOn'>The fan is <b>{status.isFanOn?"ON":"OFF"}</b></p>
      <p id='isAuto'>The mode is <b>{status.isAuto?"Auto":"Manual"}</b></p>
      <p id='isBtnOn'>The button is <b>{status.isBtnOn?"ON":"OFF"}</b></p>
      <button onClick={OnBtnClicked}>ON</button>
      <button onClick={OffBtnClicked}>OFF</button>
      <button onClick={reqStatBtnClicked}>Request status</button>
      <button onClick={exBtnClicked}>Example</button>
      <button onClick={chModeBtnClicked}>ChangeMode</button>
    </>
  );
}

export default App;
