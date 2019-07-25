/* eslint-disable no-underscore-dangle */

import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { loadingBarReducer } from 'react-redux-loading-bar';

export default reducers => createStore(
  combineReducers({ ...reducers, loadingBar: loadingBarReducer }),
  compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  ),
);
