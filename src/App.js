import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const isAliveRequest = () => {
      fetch('http://192.168.10.55/isAlive')
      .then((response) => {
        return response.text()
      })
      .then((text) => {
        if(text.indexOf('espAlive')!=0){
          setState({
            ...state,
            isAlive:false,
            status:`arduino not responding`,
            btnTglLabel:'Toggle',
            btnTglDisabled:true
          })
        }
        setTimeout(isAliveRequest,1500)
      })
      .catch(() => {
        setState({
          ...state,
          status:`esp not responding`,
          btnTglLabel:'Toggle',
          btnTglDisabled:true,
          isAlive:false
        })
        console.log('esp not responding')
        setTimeout(isAliveRequest,1500)
      })
    }
  const [state,setState] = useState({})
  function btnTglClicked(){
    setState({
      ...state,
      btnTglLabel:'toggling...',
      btnTglDisabled:true,
    })

    fetch('http://192.168.10.55/toggle')
    .then((response) => {
      return response.text()
    })
    .then((text) => {
      setState(text)
      if(text.indexOf('status:')!=0){
        setState({
          ...state,
          status:`Running Meter: ${text[7]}`,
          toggleBtn:'*Toggled'
        })
      }
      else{
        setState({
          ...state,
          toggleBtn:'invalid response'
        })
      }
      setTimeout(()=>{
        setState({
          ...state,
          btnTglLabel:'Toggle',
          btnTglDisabled:false,
        })
      },1000)
    })
  }
  useEffect(() => {
    //make a fetch request 'getStatus'
    fetch('http://192.168.10.55/getStatus')
    .then((response) => {
      return response.text()
    })
    .then((text) => {
      if(text.indexOf('currentMeter:')!=-1){
        setState({
          isAlive:true,
          status:`Running Meter: ${text[13]}`,
          btnTglLabel:'Toggle',
          btnTglDisabled:false
        })
      }
      setTimeout(isAliveRequest,1500)
    })
  })
  return (
    <div>
      {(Object.values(state).length > 0)?(
        <div>
          <h1 id='status'>{state.status}</h1>
          <button id='btnStatus' disabled={state.btnTglDisabled} onClick={btnTglClicked}>{state.btnTglLabel}</button>
        </div>
      ):(
        <h1>Loading...</h1>
      )}
    </div>
  )
}

export default App