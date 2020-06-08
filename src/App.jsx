import React, { useState } from 'react';
import './App.css';
import DrumPadButton from './component/DrumPadButton/DrumPadButton';
import { bankOne, bankTwo } from './data/sound-banks';

export default function App() {
  const [isPowered, setIsPowered] = useState(true);
  const [displayText, setDisplayText] = useState('Drum Machine');
  const [bank, setBank] = useState(bankOne);
  const [volume, setVolume] = useState(1);
  const [bankSwitch, setBankSwitch] = useState(false);

  const toggleBanks = ()=>{
    setBankSwitch(!bankSwitch);
    setDisplayText(bankSwitch? "Bank One": "Bank Two")
    const nextBank =  bankSwitch? bankOne: bankTwo;
    setBank(nextBank);

  }
  return (
    <div id="drum-machine">
      <div className="controls">
        <p id="display">{displayText}</p>

        <div>
          <p>Bank</p>
          <label className="switch">
          <input type="checkbox"  onClick={toggleBanks}/> 
          <span className="slider round" data-bank={bankSwitch? 2: 1}></span>
        </label>
        </div>
        
      </div>
      <ul className="drum-pads-container">
        {bank.map((el) => (
          <DrumPadButton
            keyTrigger={el.keyTrigger}
            key={el.id}
            url={el.url}
            id={el.id}
            setDisplayText={setDisplayText}
            isPowered={isPowered}
            keyCode={el.keyCode}
          />
        ))}
      </ul>
    </div>
  );
}
