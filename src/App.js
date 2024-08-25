import './App.css';
import {OnBtnClicked} from './client.js'
import {OffBtnClicked} from './client.js'

function App() {
  return (
    <>
      <button onClick={OnBtnClicked}>ON</button>
      <button onClick={OffBtnClicked}>OFF</button>
      <button onClick={reqStatBtnClicked}>Request status</button>
    </>
  );
}

export default App;
