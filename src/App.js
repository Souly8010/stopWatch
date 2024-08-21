import React, { useState, useEffect } from 'react';
import "./styles/tailwind.css";

function StopWatch() {
  const [time, setTime] = useState(0); // Stocke le temps écoulé en millisecondes
  const [isRunning, setIsRunning] = useState(false); // Chrono en marche ou non
  const [laps, setLaps] = useState([]); // Stocke les laps

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10); // Incrémente le temps de 10 ms
      }, 10); // Intervalle de 10 ms pour une précision au centième de seconde
    } else if (!isRunning && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const handleStart = () => { // Démarre le chronomètre
    setIsRunning(true);
  }

  const handleStop = () => { // Arrête le chronomètre
    setIsRunning(false);
  }

  const handleReset = () => { // Réinitialise le chronomètre
    setIsRunning(false);
    setTime(0);
    setLaps([]); // Vide la liste des laps
  }

  const handleLap = () => { // Enregistre le temps actuel comme un lap
    setLaps([...laps, time]);
  }

  const formatTime = (time) => {
    const getMilliseconds = `00${time % 1000}`.slice(-3);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${getMilliseconds}`;
    return formattedTime;
  }

  return (
    <div className="min-h-screen bg-gray-700 flex flex-col justify-center items-center py-11">
      <div className="container flex flex-col items-center space-y-5">
        <h1 className="text-4xl font-bold text-white">{formatTime(time)}</h1>
        <div className="flex space-x-3">
          <button className="bg-green-400 px-4 py-2 rounded" onClick={handleStart}>Start</button>
          <button className="bg-red-400 px-4 py-2 rounded" onClick={handleStop}>Stop</button>
          <button className="bg-blue-400 px-4 py-2 rounded" onClick={handleReset}>Reset</button>
          <button className="bg-yellow-400 px-4 py-2 rounded" onClick={handleLap}>Lap</button>
        </div>
        <ul className="mt-5 text-white">
          {laps.map((lap, index) => (
            <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <StopWatch />
    </>
  );
}

export default App;
