import './App.css';
import {OnBtnClicked} from './client.js'
import {OffBtnClicked} from './client.js'
import { tstCorsBtnClicked} from './client.js';

function App() {
  return (
    <>
      <button onClick={OnBtnClicked}>ON</button>
      <button onClick={OffBtnClicked}>OFF</button>
      <button onClick={tstCorsBtnClicked}>Tet CORS</button>
    </>
  );
}

export default App;
