import './App.css';
import {OnBtnClicked,OffBtnClicked,reqStatBtnClicked,exBtnClicked} from './client.js'

function App() {
  return (
    <>
      <button onClick={OnBtnClicked}>ON</button>
      <button onClick={OffBtnClicked}>OFF</button>
      <button onClick={reqStatBtnClicked}>Request status</button>
      <button onClick={exBtnClicked}>Example</button>
    </>
  );
}

export default App;
