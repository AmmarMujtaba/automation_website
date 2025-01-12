import { useEffect, useState } from 'react';
import './App.css';

const netAddr = '10.42.0'

const isAliveTimeOut = 1000
let isRequestProcessed = true, toggledCount = 0, disconnected = false

function App() {
  function getStatus(){
    console.warn('inside getStatus');
    fetch(`http://${netAddr}.55/getStatus`)
    .then((response) => {
      return response.text()
    })
    .then((text) => {
      if(text.indexOf('currentMeter:')!==-1){
        setState({
          isAlive:true,
          status:`Running Meter: ${text[13]}`,
          btnTglLabel:'Toggle',
          btnTglDisabled:false
        })
        console.log('getStatus ok')
      }
      else{
        setState({
          ...state,
          status:'status was not fetched, trying again...'
        })
        getStatus()
      }
    })
    .catch(() => {
      console.log("error in fetch request to getStatus")
    })
  }
  const isAliveRequest = () => {
    console.log('inside isAliveRequest')
    if(isRequestProcessed){
      isRequestProcessed = false
      fetch(`http://${netAddr}.55/isAlive`)
      .then((response) => {
        return response.text()
      })
      .then((text) => {
        if(text.indexOf('espAlive')!==-1){
          setState({
            ...state,
            isAlive:false,
            status:`arduino not responding`,
            btnTglLabel:'Toggle',
            btnTglDisabled:true
          })
          disconnected = true
          console.log('arduino was not resonding')
        }
        else if(text.indexOf('bothAlive')!==-1){
          console.log('both Alive')
          if(disconnected){
            getStatus()
            disconnected = false
          }
        }
        isRequestProcessed = true
      })
      .catch(() => {
        setState({
          ...state,
          status:`esp not responding`,
          btnTglLabel:'Toggle',
          btnTglDisabled:true,
          isAlive:false
        })
        isRequestProcessed = true
        disconnected = true
        console.log('esp not responding')
      })
    }
    else{
      console.log('previous request in processing')
    }
  }
  const [state,setState] = useState({})
  function btnTglClicked(){
    console.warn('inside btnTglClicked');
    setState({
      ...state,
      btnTglLabel:'toggling...',
      btnTglDisabled:true,
    })
    fetch(`http://${netAddr}.55/toggle`)
    .then((response) => {
      return response.text()
    })
    .then((text) => {
      if(text.indexOf('status:')!==-1){
        console.warn('status found');
        
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
    })
    .catch(() => {
      console.log("error in fetch request to toggle")
    })
  }
  useEffect(() => {
    //make a fetch request 'getStatus'
    console.warn('inside useeffect')
    getStatus()
    setInterval(isAliveRequest,isAliveTimeOut)
  },[])
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