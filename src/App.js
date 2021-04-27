import React, { useEffect, useState } from 'react';
import './App.css';



export default () => {
  const [time, setTime] = useState(0);
  const [stateOfTimer, setStartEnd] = useState(false);


  const timeInTrueFormat = () => {
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

      if(!time){
        return '00:00:00'  
      }
      
      return `${hours}:${minutes}:${seconds}`
  };


  useEffect(() => {
    let interval;

    if(stateOfTimer){
      interval = setInterval(() => {
        setTime(prev => prev + 1000);
      }, 1000);
    }else{
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    }
  }, [stateOfTimer]);

  const startStopTimer = () => {
    setStartEnd(prev => !prev)  
  };

  const resetTimer = () => {
    setStartEnd(false);
    
    setTimeout(() => {
        setStartEnd(true);
    }, 1000)
    setTime(0)  
  };

  const wasteTimer = () => {
      setStartEnd(false);
  };


  return (
    <div className="timer">
        <div className="timmer__title">
          Timer
        </div>
        <div className="timer__bar">
          {timeInTrueFormat()}
        </div>
        <div className="btn-box">
          <a className="timer__btn" onClick = {startStopTimer}>
            {stateOfTimer ? 'Stop' : 'Start'}
          </a>
          <a className={`timer__btn ${stateOfTimer ? `` : 'timer__btn_disable'}`} onDoubleClick = {wasteTimer}  >
            Wait
          </a>
          <a className="timer__btn" onClick = {resetTimer}>
            Reset
          </a>
        </div>
      </div>
  );
}

