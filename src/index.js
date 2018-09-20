import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './components/App/App';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' render={props => <App {...props} />} />
    </Switch>
  </BrowserRouter>,
    document.querySelector('#root'),
);

