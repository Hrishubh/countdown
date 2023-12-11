import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import './timer.css';

const Timer = () => {
  const [inputMinutes, setInputMinutes] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [buttonText, setButtonText] = useState('Pause');

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timerRunning && timeLeft === 0) {
      setTimerRunning(false);
    }
  }, [timerRunning, timeLeft]);

  const startTimer = () => {
    const minutes = parseInt(inputMinutes, 10);
    if (!isNaN(minutes) && minutes > 0) {
      setTimeLeft(minutes * 60);
      setTimerRunning(true);
    }
  };

  const pauseTimer = () => {
    if (timerRunning) {
      setTimerRunning(false);
      setButtonText('Restart')
    } else {
      setTimerRunning(true);
      setButtonText('Pause')
    }
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimeLeft(null);
    setInputMinutes('');
  };

  const inputChange = (time) => {
    setInputMinutes(time);
    setTimerRunning(false);
    setTimeLeft(null);
  }

  const formatTime = (time) => {
    if (time === null) {
      return '00:00:00';
    }
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <div className="timer-content">
        <h1 className="timer-title">
          <FontAwesomeIcon icon={faPlayCircle} /> Enter Minutes:
        </h1>
        <div className="timer-input">
          <label>
            <input
              type="number"
              value={inputMinutes}
              onChange={(e) => inputChange(e.target.value)}
            />
          </label>
        </div>
        <p className="timer-countdown">
          <FontAwesomeIcon icon={faPlayCircle} onClick={startTimer} style={{ marginRight: '10px', cursor: 'pointer' }} />
          {formatTime(timeLeft)}
        </p>
        <div className="timer-controls">
          <button onClick={pauseTimer}>{buttonText}</button>
          <button onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Timer;
