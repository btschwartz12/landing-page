import React from 'react';

import ParticlesBg from 'particles-bg';

import { AwesomeButton } from "react-awesome-button";
import MovingComponent from 'react-moving-text';
import 'react-awesome-button/dist/styles.css';
import '../styles/App.css';


const title = '404 :('
const tagline = "This is sad. You've reached a page that doesn't exist."


const styles = {
  bg: {
  },
  titleLetterStyle: {       
    display: 'inline-block',
    fontSize: '3em',
    fontFamily: 'Roboto, sans-serif',
    color: 'white',
    marginLeft: '0.02em',
    marginRight: '0.02em',
    textAlign: 'center',
  }
}

const buttonData = [
  {
    text: 'Return Home',
    link: 'https://btschwartz.com/',
    type: 'primary'
  },

]

const words = ["tadpole"];


function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

const MovingElement = ({ element: Element, ...props }) => {
  return (
    <MovingComponent
        type="unfold"
        duration="1000ms"
        delay="0s"
        direction="alternate"
        timing="ease"
        iteration="1"
        fillMode="none"
        {...props}
    >
        <Element />
    </MovingComponent>
  );
};


const Buttons = () => {
  
  return (
    <div className="button-container">
      {buttonData.map((button, index) => {
        return (
          <MovingElement element={() =>
            <AwesomeButton type={button.type} target="_blank" href={button.link}>{button.text}</AwesomeButton>}>
          </MovingElement>
        )
      })}
        
    </div>
  );
}

const Title = () => {
  return (
    <div className="container-blank">
      <MovingElement type='fadeIn' element={() => 
        <h1 className='intro'>{title}</h1>}>
      </MovingElement>      
    </div>
  );
}



const Tagline = () => {
  return (
    <div className="container-blank">
      <MovingElement type='fadeIn' element={() => 
        <div className="tagline">
          {tagline}
        </div>}>
      </MovingElement> 
    </div>
  );
}


const ErrorPage = () => {


  return (
    <div className='daylight' style={styles.bg}>
      <div
        className='default'
      >
        <main className="App-main">
            <ParticlesBg 
                type={getRandomWord()} 
                color="#00ffbf"
                bg={true} 
                num={30} 
                />
            <Title />
            <Tagline />
            <Buttons />


        </main>
      </div>
    </div>
  );
}

export default ErrorPage;
