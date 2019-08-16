import React from "react";
import "./DrumPadButton.css";

export default class DrumPadButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.playSound = this.playSound.bind(this);
    this.animatePadPressed = this.animatePadPressed.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPressed);
  }

  handleClick() {
    this.animatePadPressed();
    this.playSound();
  }
  handleKeyPressed(event) {
    if (event.keyCode === this.props.keyCode) {
    this.handleClick();
    }
  }
  playSound() {
    const audioEl = document.getElementById(`${this.props.keyTrigger}`);
    audioEl.currentTime = 0;
    audioEl.play();
  }

  animatePadPressed() {
    const drumPad = document.getElementById(`${this.props.keyTrigger}`)
      .parentElement;
    drumPad.classList.toggle("drum-pad-pressed");
    setTimeout(() => {
      drumPad.classList.toggle("drum-pad-pressed");
    }, 200);
  }

  render() {
    return (
      <button className="drum-pad" onClick={this.handleClick}>
        <h3>{this.props.keyTrigger}</h3>
        <audio
          id={this.props.keyTrigger}
          className="clip"
          src={this.props.url}
          preload="auto"
        />
      </button>
    );
  }
}
