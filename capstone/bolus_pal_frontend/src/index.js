import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import "core-js/stable";
import "regenerator-runtime/runtime";
// import registerServiceWorker from './registerServiceWorker';

const container = document.getElementById("app");
ReactDOM.render(<BrowserRouter>
    <App />
</BrowserRouter>, container);
