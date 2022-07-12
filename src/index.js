import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from "redux";
import {reducer} from './store/reducer.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const asyncMiddleware = storeAPI => next => action => {
    if (typeof action === 'function')
        return action(storeAPI.dispatch, storeAPI.getState)

    next(action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const rootReducer = combineReducers({
//
// })
//rootReducer -> in createStore

//can do a single reducer or multiple reducers - needs at least one reducer function

const store = createStore(reducer, composeEnhancers(applyMiddleware(asyncMiddleware)))

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

