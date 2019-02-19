import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise'
import createHistory from 'history/createBrowserHistory'
import reducers from '../reducers';

export const history = createHistory();

const initialState = {}
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(promise, thunk, routerMiddleware(history))
);

export default store;
