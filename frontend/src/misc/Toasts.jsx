import React from 'react';


import toast from 'react-hot-toast';
import 'react-awesome-button/dist/styles.css';

import '../styles/App.css';
import { set } from 'animejs';


const styles = {
    toast1: {
        minWidth: "250px",
        fontSize: "20px",
        backgroundColor: "#de6191",
        color: "#fdffe5",
        fontFamily: "Roboto, sans-serif",
        whiteSpace: "pre-wrap",
        width: "auto",
    },
    toast2: {
        minWidth: "250px",
        fontSize: "20px",
        backgroundColor: "#19c37d",
        color: "#fdffe5",
        fontFamily: "Roboto, sans-serif",
        whiteSpace: "pre-wrap",
        width: "auto",
    },
    toast3: {
      minWidth: "250px",
      fontSize: "20px",
      backgroundColor: "#fffc6c",
      color: "#6c6a00",
      fontFamily: "Roboto, sans-serif",
      whiteSpace: "pre-wrap",
      width: "auto",
    },
}


const API_URL = 'https://btschwartz.com/api/v1/';
const explanation = "My name is Ben Schwartz, and you just found the landing page of my website. Please check out my portfolio, it's the only decent thing you'll find here.";


const contactMsg = "You can reach me here: scben@umich.edu";





const ServerInfo = () => {

    const fetchData = () => {
        return fetch(API_URL + 'server')
            .then(response => response.json())
            .then(data => {
            const respData = {
                currentTime: data.current_time,
                joke: data.joke,
                os: data.system_info.os,
                machine: data.system_info.machine,
                processor: data.system_info.processor,
                pythonVersion: data.system_info.python_version,
                nodeName: data.system_info.node_name,
                clientIP: data.client_ip
            }
            return respData;
            })
            .catch(error => console.error(error));
    };

    const myPromise = fetchData();
    return (
        toast.promise(
            myPromise, 
            {
                loading: 'Asking...',
                success: (respData) => {
                const currentTime = respData.currentTime;
                const { os, processor, pythonVersion, nodeName, clientIP } = respData;
                return (
                    "Server:\n\n" +
                    "Hey, it's me, the server! I've been told my name is " + nodeName + ". " +
                    "I am a KVM virtual machine, " +
                    " running a Ubuntu 20.04 " + os + " operating system with a " + processor + " processor. " +
                    "I am currently running uWSGI and Flask with Python " + pythonVersion +
                    " to serve this website!" +
                    "\n\n" +
                    "My hardware lives in New York, and I think it is " + currentTime + "\n\n" +
                    "I don't know where you live, but I do know your IP address: " + clientIP + "." +
                    "\n\nNice to meet you!"
                )
                },
                error: 'Request failed :(',
            },
            {
                style: styles.toast1,
                success: { duration: 7000 },
                reverseOrder: false,
                position: 'bottom-right',
            }

        )
    );
}



const FunFact = () => {

    const fetchData = () => {
      return fetch(API_URL + 'funfact/random')
          .then(response => response.json())
          .then(data => {
          const respData = {
              funfact: data.fact
          }
          return respData;
          })
          .catch(error => console.error(error));
  };


  const myPromise = fetchData();
  return (
      toast.promise(
          myPromise, 
          {
              loading: 'Loading',
              success: (respData) => {
                const fun_fact = respData.funfact;
                return (
                    fun_fact
                )
              },
              error: 'Error when fetching',
          },
          {
              style: styles.toast3,
              success: { duration: 5000 },
              reverseOrder: false,
              position: 'top-right',
              
          }

      )
  );
}

const Explanation = () => toast(explanation, {
  style: {
    minWidth: '250px',
    fontSize: "20px",
    backgroundColor: "#fffc6c",
    color: "#6c6a00",
    fontFamily: "Roboto, sans-serif",
  },
  duration: 4500,
  reverseOrder: true,
  position: 'top-left',
});

const message = "Here's my email:";
const email = "scben@umich.edu";

const ContactMsg = () => {
  // First Toast for the message
  const firstToastId = toast(message, {
    style: {
      minWidth: '250px',
      fontSize: "20px",
      backgroundColor: "#ff6c6c",
      color: "#fdffe5",
      fontFamily: "Roboto, sans-serif",
    },
    duration: 2000,
    reverseOrder: true,
    position: 'top-right',
  });

  setTimeout(() => {
    toast.dismiss(firstToastId);
  }, 2000);

  // Second Toast for the email
  setTimeout(() => {
    const secondToastId = toast(email, {
      style: {
        minWidth: '250px',
        fontSize: "20px",
        backgroundColor: "#bafc03",
        color: "#6c6a00",
        fontFamily: "Roboto, sans-serif", 
      },
      duration: 2000,
      reverseOrder: true,
      position: 'bottom-right',
    });
    setTimeout(() => {

      toast.dismiss(secondToastId);
    }, 2000);
  }, 1000);
};





const AskChatGPT = (prompt) => {
 
  const gptFetch = (prompt) => {
    return fetch('https://btschwartz.com/api/v1/chat/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        question: prompt,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const respData = {
          answer: data.content
        }
        return respData;
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
  };


  const myPromise = gptFetch(prompt);
  return (
      toast.promise(
          myPromise, 
          {
              loading: 'Loading',
              success: (respData) => {
              const answer = respData.answer;
              return (
                  "ChatGPT:\n\n" + answer
              )
              },
              error: 'Error when fetching',
          },
          {
              style: styles.toast2,
              success: { duration: 8000 },
              reverseOrder: false,
              position: 'top-right',
              
          }

      )
  );
}


const TestToast = () => {
  return (
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                alt=""
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                Emilia Gates
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Sure! 8:30pm works great!
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    ))
  );
}

const more = "Please be patient, more is coming soon!"

const More = () => toast(more, {
  style: {
    minWidth: '250px',
    fontSize: "20px",
    backgroundColor: "#848289",
    color: "#ffffff",
    fontFamily: "Roboto, sans-serif",
  },
  duration: 4500,
  reverseOrder: true,
  position: 'bottom-left',
});


export { ServerInfo, FunFact, Explanation, AskChatGPT, TestToast, More, ContactMsg } 
