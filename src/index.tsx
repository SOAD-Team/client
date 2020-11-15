import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './serviceWorker';
import * as Constants from './constants'
import "../src/web.config"

console.log('API_URL => ', Constants.apiUrl);

ReactDOM.render(
  <BrowserRouter basename={Constants.baseUrl}>
    <App />
  </BrowserRouter>,
  Constants.rootElement);

registerServiceWorker();
