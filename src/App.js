import './App.css';
import OnBtnClicked from './client.js'
import OffBtnClicked from './client.js'

function App() {
  return (
    <>
      <button id='fanBtn' onClick={OnBtnClicked}>ON</button>
      <button id='fanBtn' onClick={OffBtnClicked}>OFF</button>
    </>
  );
}

export default App;
