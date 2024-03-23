import React, { useState, useEffect } from 'react';



import { Toaster } from 'react-hot-toast';



import { MovingElement } from '../components/MovingElement.jsx';
import Buttons from '../components/Buttons.jsx';
import '../styles/App.css';
import 'react-awesome-button/dist/styles.css';
import ParticlesBg from 'particles-bg';
import { Explanation, AskChatGPT, TestToast } from '../misc/Toasts.jsx'
import ChatGPTModal from '../misc/ChatGPTModal.jsx';

const title = 'B)'
const tagline = 'Welcome to the VIP section! Check out some stuff below.'


const styles = {
  bg: {
  },
}

const BackHome = () => {
  window.location.href = '/';
};


const buttonData = [
  
 

  {
    text: "Visitors",
    row: 1,
    link: "https://btschwartz.com/api/v1/who",
    className: 'red'
  },

  {
    text: "PMA",
    row: 2,
    link: "https://btschwartz.com/saulmcgill",
    className: 'blue'
  },
  
  
  
  {
    text: 'Ask ChatGPT',
    row: 3,
    modalId: 'chatGPT',
    modal: ChatGPTModal, // Replace with your specific modal component
    modalProps: { onSubmit: AskChatGPT }, // Pass any additional props your modal might need
    className: 'green'
  },

  {
    text: 'Return Home',
    handleClick: BackHome,
    row: 6,
    className: 'pink'

  },


]


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

let config1 = {
  num: 1,
  rps: 0.075,
  radius: [1, 3],
  life: [4,8],
  v: [0.5, 1],
  tha: [-10, 10],
  alpha: [1, 0.1],
  scale: [1, 1],
  position: "all",
  color: ["random", "#0000ff"],
  cross: "dead",
  random: 1,
  g: 0,
  onParticleUpdate: (ctx, particle) => {
    ctx.save(); // save the current state of the context
    ctx.translate(particle.p.x, particle.p.y); // move the context to the particle's position
    ctx.rotate(particle.theta * Math.PI / 180); // rotate the context by the particle's angle (in radians)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(particle.radius * 20, 0);
    ctx.strokeStyle = particle.color;
    ctx.lineWidth = particle.radius;
    ctx.stroke();
    ctx.closePath();
    ctx.restore(); // restore the previous state of the context
    particle.theta += 0.1; // increment the particle's angle by a small amount
  },
  theta: 0, // add a new property to keep track of the angle
};


const VIP = () => {

  useEffect(() => {
    const formData = new FormData();
    formData.append('saul', 'vip');
    fetch('/saul', {
      method: 'POST',
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      }
    );
  }, []);


  return (
    <div className="daylight" style={styles.bg}>

      <div className="default" >
        <main className="App-main">
          <ParticlesBg 
                type="custom" config={config1}
                bg={true} 
                num={6} 
                styles={{backgroundColor: 'black'}}
          />
          <Title />
          <Tagline />
          <Buttons buttonData={buttonData}/>
          <Toaster />
          
        </main>

      </div>
      
    </div>
  );
};

export default VIP;
