import React from 'react';
import { createRoot } from 'react-dom/client';
import '../styles/index.css';
import * as serviceWorker from '../serviceWorker.jsx';
import VIP from '../pages/VIP.jsx';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<VIP />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
