import React from 'react';


import { AwesomeButton } from "react-awesome-button";
import toast from 'react-hot-toast';
import 'react-awesome-button/dist/styles.css';

import '../styles/App.css';


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
      return fetch(API_URL + 'funfact')
          .then(response => response.json())
          .then(data => {
          const respData = {
              funfact: data.content
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
    backgroundColor: "#6678c5",
    color: "#fdffe5",
    fontFamily: "Roboto, sans-serif",
  },
  duration: 4000,
  reverseOrder: true,
  position: 'top-left',
});


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
    toast((t) => (
      <span>
        Custom and <b>bold</b>
        <AwesomeButton 
        onPress={() => toast.dismiss(t.id)}
        className="aws-btn small">
          Dismiss
        </AwesomeButton>
      </span>
    ),
    {
      duration: 10000,
    }
    )
  );
}


export { ServerInfo, FunFact, Explanation, AskChatGPT, TestToast } 