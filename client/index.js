import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute, hashHistory } from 'react-router';
import { combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './public/reducers/index';

import App from './public/components/App';
import Login from './public/components/FBLogin';
import Home from './public/components/Home';
import ChatPage from './public/components/ChatPage';
import About from './public/components/About';

import InitFB from './public/components/auth/InitFB';

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
export const store = createStoreWithMiddleWare(rootReducer, window.devToolsExtension ? window.devToolsExtension() : f => f);

const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/about" component={About} />
      <Route path="/" component={InitFB(App)} >
        <IndexRoute component={InitFB(Home)} />
        <Route path="login" component={InitFB(Login)} />
        <Route path="chats/:bonId" component={InitFB(ChatPage)} />
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(
  router, document.getElementById('app')
);

