import './App.css';
import {OnBtnClicked,OffBtnClicked,reqStatBtnClicked,exBtnClicked,chModeBtnClicked} from './client.js'

function App() {
  return (
    <>
      <button onClick={OnBtnClicked}>ON</button>
      <button onClick={OffBtnClicked}>OFF</button>
      <button onClick={reqStatBtnClicked}>Request status</button>
      <button onClick={exBtnClicked}>Example</button>
      <button onClick={chModeBtnClicked}>ChangeMode</button>
    </>
  );
}

export default App;
