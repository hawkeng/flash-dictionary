import React from 'react';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import 'whatwg-fetch';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

render((
 <Router>
    <App />
  </Router>
), document.getElementById('root'));

registerServiceWorker();
