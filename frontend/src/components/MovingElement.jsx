
import React from 'react';


import MovingComponent from 'react-moving-text';
import 'react-awesome-button/dist/styles.css';
import '../styles/App.css';


export const MovingElement = ({ element: Element, effect, ...props }) => {
    return (
      <MovingComponent
        type={effect}
        duration="1500ms"
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