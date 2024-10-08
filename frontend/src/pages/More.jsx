import React, { useState, useEffect, useContext } from 'react';



import { Toaster } from 'react-hot-toast';



import { MovingElement } from '../components/MovingElement.jsx';
import Buttons from '../components/Buttons.jsx';
import '../styles/App.css';
import 'react-awesome-button/dist/styles.css';
import ParticlesBg from 'particles-bg';
import { FunFact, ServerInfo } from '../misc/Toasts.jsx';
import ImageGenModal from '../misc/ImageGenModal.jsx';
import ConversationModal from '../misc/ConvoModal.jsx';
import AnimationContext from '../misc/AnimationContext.jsx';
import { AwesomeButton } from "react-awesome-button";
import LoginModal from '../misc/LoginModal.jsx';

const title = 'More?'
const tagline = "Bruh, you really want more? Fine, here's some more stuff."


const styles = {
  bg: {
  },
}




const handleLoginClick = () => {
  // Access /logged_in_user to check if the user is logged in
  // will return 200 if logged in, 401 if not
  // fetch('/is_logged_in')
  //   .then((response) => {
  //     if (!response.ok) {
  //       return false;
  //     }
  //     return true;
  //   })
  //   .then((logged_in) => {
  //     if (logged_in) {
  //       handleSuccess();
  //     }
  //   })
  //   .catch((error) => {
  //     // Don't do anything, the user is not logged in
  //   });
  
};

const handleSuccess = () => {
  window.location.href = '/vip';
};



const Title = () => {
  return (
    <div className="my-container overlay-content">
      <MovingElement type='fadeIn' element={() => 
        <h1 className='intro'>{title}</h1>}>
      </MovingElement>      
    </div>
  );
}



const Tagline = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [fetchedMessage, setFetchedMessage] = useState(null);
  const [currentlyFetching, setCurrentlyFetching] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000); // Update every 1000ms (1 second)

    return () => {
      clearInterval(timer);
    };
  }, []);

  const fetchTagline = () => {

    if (currentlyFetching) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setFetchedMessage(tagline);
    }, 5000); // Fallback to 'tagline' after 5 seconds

    

    setCurrentlyFetching(true);

    setFetchedMessage('...');

    fetch('https://btschwartz.com/api/v1/chat/moremessage')
      .then(response => response.json())
      .then(data => {
        const respData = {
          message: data.content,
        };
        setFetchedMessage(respData.message);
        clearTimeout(timeoutId);
      })
      .catch(error => {
        console.error(error);
        clearTimeout(timeoutId);
        setFetchedMessage(tagline);
      })
      .finally(() => {
        setCurrentlyFetching(false);
      });
      

    return () => {
      clearTimeout(timeoutId);
    };
  };

  useEffect(() => {
    fetchTagline();
  }, []);

  return (
    <div className="my-container overlay-content">
      {fetchedMessage && (
        <>
        <MovingElement type="fadeIn" element={() => (
          <div className="tagline">{fetchedMessage}</div>
        )}></MovingElement>
        <AwesomeButton
          className='aws-btn small'
          onPress={fetchTagline}
          style={{ marginBottom: '1rem' }}
        >
          <i className="fas fa-sync-alt"></i>
        </AwesomeButton>
        </>
        
        
      )}
      
      <MovingElement type="fadeIn" element={() => (
        <div className="tagline-small">{currentTime}</div>
      )}></MovingElement>
      
    </div>
  );
};


const MorePage = () => {


  const buttonData = [

    // Development and Tools
    
    
    {
      text: 'Honeypot Activity',
      link: 'https://honeypot.btschwartz.com/honeypot/reports',
      row: 1,
      className: 'red'
    },
    {
      text: 'GPT-4 Convo',
      modal: ConversationModal,
      modalId: 'convo',
      modalProps: {
        apiURL: 'https://btschwartz.com/api/v1/chat/convo',
      },
      row: 1,
      className: 'green'
    },

    {
      text: 'API',
      row: 2,
      className: 'green',
      link: 'https://btschwartz.com/api/v1/'
    },

    {
      text: 'Token Acquisition',
      link: 'https://btschwartz.com/api/v1/auth/login',
      row: 2,
      className: 'gold'
    },


    // Communication and Social Media
    {
      text: 'Chat with Saul',
      link: 'https://chat.btschwartz.com',
      row: 3,
      className: 'purple'
    },
    {
      text: 'Waltuh',
      link: 'https://btschwartz.com/waltuh/',
      row: 3,
      className: 'gray'
    },
    {
      text: 'Icestation Insta',
      link: 'https://btschwartz.com/icestation',
      row: 3,
      className: 'gray'
    },
    {
      text: 'Saul Searcher',
      link: 'https://saul.btschwartz.com/',
      row: 3,
      className: 'gray'
    },
    
    
  
    // Fun and Entertainment
    {
      text: 'Bliss TV',
      link: 'https://rigor.btschwartz.com/',
      row: 4,
      className: 'gray'
    },
    
    {
      text: 'Pics',
      link: 'https://btschwartz.com/pics/',
      row: 4,
      className: 'purple'
    },
    {
      text: 'Draft Picker',
      link: 'https://fish.btschwartz.com/',
      row: 4,
      className: 'gray'
    },
    {
      text: 'Instagram Clone',
      link: 'https://btschwartz.com/insta',
      row: 4,
      className: 'gray'
    },

    // Miscellaneous
    {
      text: 'Fun Fact',
      row: 5,
      toast: FunFact,
      className: 'gray'
    },
    
    // Navigation
    {
      text: 'Return Home',
      row: 5,
      navLink: '/',
      link: '/',
      className: 'blue',
    },
    {
      text: 'VIP',
      row: 5,
      modalId: 'vip',
      modal: LoginModal,
      handleClick: () => handleLoginClick(),
      modalProps: { 
        onSuccess: () => handleSuccess(),
      },
      className: 'gold'
    },
    
    
  ];
   


  const { setHasAnimated } = useContext(AnimationContext);

  


  // if the user starts by going to More page, do not want to animate
  // if they go back to home
  useEffect(() => {
    setHasAnimated(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('visitedMorePage', 'true');

  }, []);

  useEffect(() => {
    const formData = new FormData();
    formData.append('saul', 'more');
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
                type="tadpole"
                color="#ffe100"
                bg={true} 
                num={6} 
                styles={{backgroundColor: 'black'}}
          />
          {/* <MyParticles /> */}
          <Title />
          <Tagline />
          <Buttons buttonData={buttonData} effect="unfold"/>
          <Toaster />
          
        </main>

      </div>
      
    </div>
  );
};

export default MorePage;
