import React, { useRef, useEffect } from 'react';
import './DrumPadButton.css';

// Time in milliseconds
const DELAY_TIME_MS = 120;

export default function DrumPadButton({
  keyTrigger,
  url,
  id,
  setDisplayText,
  isPowered,
  keyCode,
}) {
  const audioEl = useRef(null);
  const audioBtn = useRef(null);
  const lastPlayed = useRef(null);

  const handleClick = (e) => {
    //do nothing if drum machine is not powered
    if (!isPowered) {
      return;
    }
    setDisplayText(id);
    playSound();
  };

  const playSound = () => {
    lastPlayed.current = new Date();
    audioEl.current.currentTime = 0;
    audioEl.current.play();
  };

  useEffect(() => {
    const currentTime = new Date();
    currentTime.setMilliseconds(currentTime.getMilliseconds() - DELAY_TIME_MS);
    lastPlayed.current = currentTime;
  }, []);

  useEffect(() => {

    const canRepeat = () => {
      const timePassed = new Date();
      timePassed.setTime(timePassed.getTime() - lastPlayed.current.getTime());
      return timePassed.getMilliseconds() >= DELAY_TIME_MS;
    };

    const simulateClick = (event) => {
      if (event.keyCode === keyCode && canRepeat()) {
        audioBtn.current.click();
        audioBtn.current.classList.toggle('drum-pad-pressed');

        setTimeout(() => {
          audioBtn.current.classList.toggle('drum-pad-pressed');
        }, 200);
      }
    };

    document.addEventListener('keydown', simulateClick);

    return function cleanUp() {
      document.removeEventListener('keydown', simulateClick);
    };
  }, [keyCode]);

  return (
    <button ref={audioBtn} className="drum-pad" id={id} onClick={handleClick}>
      <h3>{keyTrigger}</h3>
      <audio
        ref={audioEl}
        src={url}
        preload="auto"
      />
    </button>
  );
}
