import React, { useState } from 'react';


import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MovingElement } from './MovingElement.jsx';
import { NavLink } from 'react-router-dom';

import '../styles/App.css';



const Buttons = ({ buttonData, effect }) => {
  const [modalStates, setModalStates] = useState({});

  const handleShow = (modalId) => {
    setModalStates((prevState) => ({ ...prevState, [modalId]: true }));
  };

  const handleClose = (modalId) => {
    setModalStates((prevState) => ({ ...prevState, [modalId]: false }));
  };

  const handlePress = (button) => {
    if (button.toast) {
      button.toast();
    }
    if (button.handleClick) {
      button.handleClick();
    }
    if (button.modal) {
      handleShow(button.modalId);
    }
    
  };


  const renderButtons = (buttonRow) =>
    buttonRow.map((button) => {
      const handleClick = (event) => {
        
        // if (button.navLink) {
        //   event.stopPropagation();
        //   event.preventDefault();
        // }
        handlePress(button);

      };

      const buttonContent = (
        <AwesomeButton
          type='primary'
          target={button.navLink ? undefined : '_blank'}
          href={button.link}
          className={`aws-btn ${button.className}`}
          onPress={handleClick}
        >
          {button.icon ? (
            <FontAwesomeIcon icon={button.icon} size="2x" /> // Set the size to "2x" (2 times larger)
          ) : (
            button.text
          )}
        </AwesomeButton>
      );

      return (
        <MovingElement key={button.text} effect={effect} element={() => (
          <>
            {button.navLink ? (
              <NavLink to={button.navLink}>
                {buttonContent}
              </NavLink>
            ) : (
              buttonContent
            )}
          </>
        )}>
        </MovingElement>
      );
    });

  const renderModals = () =>
    buttonData.filter(button => button.modal).map(button => (
      <button.modal
        key={button.modalId}
        show={modalStates[button.modalId]}
        handleClose={() => handleClose(button.modalId)}
        {...button.modalProps}
      />
    ));

  const getButtonRows = () => {
    const numRows = Math.max(...buttonData.map(button => button.row));
    const buttonRows = [];
  
    for (let i = 1; i <= numRows; i++) {
      const buttonsInRow = buttonData.filter(button => button.row === i);
      buttonRows.push(buttonsInRow);
    }
    return buttonRows;
  };

  return (
    <>
      {getButtonRows().map((buttonRow, index) => (
        <div className={`my-button-container row-${index + 1}`} key={index}>
          {renderButtons(buttonRow)}
        </div>
      ))}
      {renderModals()}
    </>
  );
};

export default Buttons;