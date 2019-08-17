import React from "react";
import "./App.css";
import DrumPadButton from "./component/DrumPadButton/DrumPadButton";
import { bankOne } from "./util/soundBanks";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPowered: true,
      displayText: 'Drum Machine',
      bank: bankOne,
      volume: 1
    };
    this.setDisplayText = this.setDisplayText.bind(this);
  }

  setDisplayText(displayText){
    this.setState({displayText});
  }
  render() {
    return (
      <div id="drum-machine">
        <div className="controls">
          <p id="display">{this.state.displayText}</p>
        </div>
        <ul className="drum-pads-container">
          {bankOne.map(el => (
            <DrumPadButton
              keyTrigger={el.keyTrigger}
              key={el.id}
              url={el.url}
              id={el.id}
              setDisplayText={this.setDisplayText}
              isPowered={this.state.isPowered}
              keyCode={el.keyCode}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
