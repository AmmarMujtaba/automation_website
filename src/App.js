import { useState } from 'react';
import './App.css';

function App() {
  const [text,setText] = useState("")
  function btnReadingClicked(){
    fetch('https://as-server-orpin.vercel.app/getReading')
    .then((response) => {
      return response.text()
    })
    .then((text) => {
      setText(text)
      console.log('response: ',text)
    })
  }
  function btnStatusClicked(){
    fetch('https://as-server-orpin.vercel.app/setStatus')
    .then((response) => {
      return response.text()
    })
    .then((text) => {
      console.log('response: ',text)
    })
  }
  return (
    <div>
      <button id='btnStatus' onClick={btnStatusClicked}>setStatus</button>
      <button id='btnReading' onClick={btnReadingClicked}>getReading</button>
      <h1 id='readingText'>{text}</h1>
    </div>
  )
}

export default App