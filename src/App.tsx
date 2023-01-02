import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [speed, setSpeed] = useState(50);
  const [quality, setQuality] = useState(25);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      setPressedKeys([event.key]);
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [pressedKeys]);


  useEffect(() => {
    const data = {
      keys: pressedKeys,
      speed: speed,
      quality: quality
    };

    fetch('http://192.168.1.16:5000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      // get the size of the entire 
      .catch((error) => {
        console.error('Error:', error);
      }
      );

  }, [pressedKeys, speed, quality]);


  // on changing the speed slider, update the speed
  useEffect(() => {
    const slider = document.getElementById("myRange") as HTMLInputElement;
    slider.oninput = function () {
      setSpeed(parseInt(slider.value));
    }
  }, [speed]);

  // on changing the quality slider, update the quality
  useEffect(() => {
    const slider = document.getElementById("myQuality") as HTMLInputElement;
    slider.oninput = function () {
      setQuality(parseInt(slider.value));
    }
  }, [quality]);


  return (
    <div className="App">
      <header className="App-header">
        <h1>MY RC CAR FROM EVERYWHERE</h1>
        <img src={"http://192.168.1.16:5000"} alt="Live stream of the RC car" />

        <p>Current key: {pressedKeys}</p>
        <label>Speed: {speed}</label>
        <input type="range" min="1" max="100" defaultValue="50" className="slider" id="myRange" />

        <label>Quality: {quality}</label>
        <input type="range" min="1" max="90" defaultValue="25" className="slider" id="myQuality" />
      </header>
    </div>
  );
}

export default App;