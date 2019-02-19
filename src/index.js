import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import store, { history } from './store/configureStore';

render((
  <Provider store={store}>
     <Router history={history}>
        <Routes/>
    </Router>
  </Provider>
), document.querySelector('.root'));
