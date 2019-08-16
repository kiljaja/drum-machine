import React from "react";
import "./App.css";
import DrumPadButton from "./component/DrumPadButton/DrumPadButton";
import { bankOne } from "./util/soundBanks";

function App() {
  return (
    <div>
      <h1>Hello there</h1>
      <ul className='drum-pads-container'>
        {bankOne.map(el => (
          <DrumPadButton keyTrigger={el.keyTrigger} key={el.id} url={el.url} keyCode={el.keyCode}/>
        ))}
      </ul>
    </div>
  );
}

export default App;
