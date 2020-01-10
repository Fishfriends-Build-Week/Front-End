import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { CookiesProvider } from 'react-cookie';
import { reducer } from './components/reducers/index'
// import * as serviceWorker from './serviceWorker';


import App from './App';
import './index.scss';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({ reducer });

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>
  ,rootElement
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
