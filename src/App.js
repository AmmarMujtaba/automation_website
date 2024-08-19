import './App.css';
import fanBtnClicked from './server.js'

function App() {
  return (
    <>
      <button id='fanBtn' onClick={fanBtnClicked}>Change</button>
    </>
  );
}

export default App;
