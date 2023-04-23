import React, { useState, useEffect } from 'react';



import { Toaster } from 'react-hot-toast';



import { MovingElement } from '../components/MovingElement.jsx';
import Buttons from '../components/Buttons.jsx';
import '../styles/App.css';
import 'react-awesome-button/dist/styles.css';
import ParticlesBg from 'particles-bg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const title = 'Hey!'
const tagline = 'Welcome to my website! Check out some stuff below.'


const styles = {
  bg: {
  },
}







function getRandomType() {
  const types = [
    { 'type': 'circle', 'num': 4 },
    { 'type': 'square', 'num': 6 },
    { 'type': 'thick', 'num': 40 },
  ]
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
}


const Title = () => {
  return (
    <div className="my-container">
      <MovingElement type='fadeIn' element={() => 
        <h1 className='intro'>{title}</h1>}>
      </MovingElement>      
    </div>
  );
}


const Tagline = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000); // Update every 1000ms (1 second)

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="my-container">
      <MovingElement type='fadeIn' element={() =>
        <div className="tagline">
          {tagline}
        </div>}>
      </MovingElement>
      <MovingElement type='fadeIn' element={() =>
        <div className="tagline-small">
          {currentTime}
        </div>}>
      </MovingElement>
    </div>
  );
};


const App = () => {
  const { type, num } = getRandomType();

  return (
    <div className="daylight" style={styles.bg}>

      <div className="default" >
        <main className="App-main">
          <ParticlesBg type={type} bg={true} num={num} 
          styles={{backgroundColor: 'black'}}
          />
          <Title />
          <Tagline />
          <Buttons />
          <Toaster />
          
        </main>

      </div>
      
    </div>
  );
};

export default App;