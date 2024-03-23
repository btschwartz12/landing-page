import React, { useState, useEffect } from 'react';



import { Toaster } from 'react-hot-toast';


import { AwesomeButton } from "react-awesome-button";
import { MovingElement } from '../components/MovingElement.jsx';
import Buttons from '../components/Buttons.jsx';
import '../styles/App.css';
import 'react-awesome-button/dist/styles.css';
import ParticlesBg from 'particles-bg';
import { Explanation, ContactMsg } from '../misc/Toasts.jsx'
import Loader from '../misc/Preloader.jsx';
import { useContext } from 'react';
import AnimationContext from '../misc/AnimationContext.jsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import ContactModal from '../misc/ContactModal.jsx';
import toast from 'react-hot-toast';
import { set } from 'animejs';


const title = 'Hey!'
const tagline = 'Welcome to my website! Check out some stuff below.'


const styles = {
  bg: {
  },
  countdownToast: {
    minWidth: "250px",
    fontSize: "20px",
    backgroundColor: "#bafc03",
    color: "#6c6a00",
    fontFamily: "Roboto, sans-serif",
    whiteSpace: "pre-wrap",
    width: "auto",
  },
  cancelToast: {
    minWidth: "250px",
    fontSize: "20px",
    backgroundColor: "#848289",
    color: "#fdffe5",
    fontFamily: "Roboto, sans-serif",
    whiteSpace: "pre-wrap",
    width: "auto",
  },
  stopToast: {
    minWidth: "250px",
    fontSize: "20px",
    backgroundColor: "#ff6c6c",
    color: "#fdffe5",
    fontFamily: "Roboto, sans-serif",
    whiteSpace: "pre-wrap",
    width: "auto",
  },
  
}

function getRandomType() {
  const types = [
    { 'type': 'circle', 'num': 4 },
    // { 'type': 'square', 'num': 6 },
    { 'type': 'thick', 'num': 40 },
  ]
  const randomIndex = Math.floor(Math.random() * types.length);
  return types[randomIndex];
}




const buttonData = [
  {
    text: 'What?',
    row: 1,
    toast: Explanation,
    className: 'gold'

  },
  
  

  {
    text: 'GitHub',
    link: 'https://github.com/btschwartz12',
    icon: faGithub,
    row: 2,
    className: 'green'
  },
  {
    text: 'Portfolio',
    link: 'https://btschwartz.com/portfolio/',
    row: 3,
    className: 'purple'

  },
  {
    text: 'LinkedIn',
    link: 'https://www.linkedin.com/in/ben-schwartz-1b700b225',
    icon: faLinkedin,
    row: 2,
    className: 'blue'
  },
  {
    text: 'Resume',
    link: 'https://btschwartz.com/resume.pdf',
    row: 3,
    className: 'black'
  },
  

  
  
  {
    text: 'Contact',
    row: 4,
    className: 'gray',
    // modal: ContactModal,
    toast: ContactMsg,
    modalId: 'contact',
    modalProps: {
    },
  },
  {
    text: 'More',
    row: 4,
    className: 'gray',
    navLink: '/more',
    link: '/more'

  }
]



const Title = () => {
  return (
    <div className="my-container">
      <MovingElement type='zoomIn' element={() => 
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
      <MovingElement type='zoomIn' element={() =>
        <div className="tagline">
          {tagline}
        </div>}>
      </MovingElement>
      <MovingElement type='zoomIn' element={() =>
        <div className="tagline-small">
          {currentTime}
        </div>}>
      </MovingElement>
    </div>
  );
};





const handleExternalLinks = () => {
  const allLinks = Array.from(document.querySelectorAll('a'));
  if (allLinks.length > 0) {
    allLinks.forEach(link => {
      if (link.host !== window.location.host) {
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
      }
    });
  }
};

const { type, num } = getRandomType();


const Home = () => {
  

  const [isLoading, setIsLoading] = useState(true);
  const [cancel, setCancel] = useState(false);

  const { hasAnimated, setHasAnimated } = useContext(AnimationContext);

  const [countdownToastIds, setCountdownToastIds] = useState([]);

  const location = useLocation();

  const [countdown, setCountdown] = useState(5);

  const navigate = useNavigate();


  useEffect(() => {
    const formData = new FormData();
    formData.append('saul', 'main');
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


  useEffect(() => {
    if (isLoading) {
      return;
    }
    handleExternalLinks();
  }, [isLoading, location]);



  const redirectToPortfolio = () => {
    window.location.href = "https://btschwartz.com/portfolio/";
    // navigate('/portfolio')
  }

  const cancelCountdown = () => {
    setCancel(true);

    
    for (const toastId of countdownToastIds) {
      toast.dismiss(toastId);
    }

    toast.remove();
    setCountdown(5);
    const toastId = toast.success(`Crisis Averted`, {
      duration: 2000,
      position: 'bottom-center',
      style: styles.cancelToast,
    });

    setTimeout(() => {
      toast.dismiss(toastId);
    }, 2000);
  };

  const finishLoading = () => {
    
    setIsLoading(false);
    setHasAnimated(true);

    toast(
      (t) => (
        <div
          onClick={() => {
            toast.dismiss(t.id);
            cancelCountdown();
          }}
          style={{ cursor: 'pointer' }}
        >
          Stop!
        </div>
      ),
      {
        duration: 5000,
        style: styles.stopToast,
        position: 'bottom-center',
      }
    );
    
  };

  useEffect(() => {

    const hasVisitedMorePage = localStorage.getItem('visitedMorePage') === 'true';

    if (hasVisitedMorePage) {
      return;
    }

    
    if ((isLoading && !hasAnimated) || cancel) {
      return;
    }
    if (countdown < 1) {
      redirectToPortfolio();
      return;
    }

    for (const toastId of countdownToastIds) {
      toast.dismiss(toastId);
    }


    // Display toast notification
    const newToastId = toast(`Redirecting to my portfolio in ${countdown}...`, {
      duration: 1000,
      position: 'bottom-center',
      style: styles.countdownToast,
    });
    setCountdownToastIds((prevCountdownToastIds) => [...prevCountdownToastIds, newToastId]);

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000); // Update every 1 second

    return () => {
      clearInterval(timer);
    };
  }, [countdown, hasAnimated, isLoading, cancel]);



  return (
    <>
      
      {isLoading && !hasAnimated ? (
        <Loader finishLoading={finishLoading} />
      ) : (
        <>
        <ParticlesBg type={type} bg={true} num={num} styles={{ backgroundColor: 'black' }} />
          <div className="daylight" style={styles.bg}>
            <div className="default">
              <main className="App-main">

                <Title />
                <Tagline />
                <Buttons buttonData={buttonData} effect="zoomIn" />
                <Toaster />
                
              </main>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
