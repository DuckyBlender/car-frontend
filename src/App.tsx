import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [speed, setSpeed] = useState(50);
  const [quality, setQuality] = useState(25);
  const [X_RES, setX_RES] = useState(320);
  const [Y_RES, setY_RES] = useState(240);

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
      quality: quality,
      x_res: X_RES,
      y_res: Y_RES
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

  }, [pressedKeys, speed, quality, X_RES, Y_RES]);


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

  // on changing the X resolution slider, update the X resolution
  useEffect(() => {
    const slider = document.getElementById("myXResolution") as HTMLInputElement;
    slider.oninput = function () {
      setX_RES(parseInt(slider.value));
    }
  }, [X_RES]);

  // on changing the Y resolution slider, update the Y resolution
  useEffect(() => {
    const slider = document.getElementById("myYResolution") as HTMLInputElement;
    slider.oninput = function () {
      setY_RES(parseInt(slider.value));
    }
  }, [Y_RES]);


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

        <label>Resolution: {X_RES}x{Y_RES}</label> 
        <input type="range" min="10" max="1280" defaultValue="320" className="slider" id="myXResolution" />
        <input type="range" min="10" max="720" defaultValue="240" className="slider" id="myYResolution" />
      </header>
    </div>
  );
}

export default App;