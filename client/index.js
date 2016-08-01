import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import { combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './public/reducers';

import App from './public/components/App';
import Login from './public/components/FBLogin';
import Home from './public/components/Home';

import InitFB from './public/components/auth/InitFB';

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleWare(reducer, window.devToolsExtension ? window.devToolsExtension() : f => f);

const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={InitFB(App)} >
        <IndexRoute component={InitFB(Login)} />
        <Route path="Home" component={InitFB(Home)} />
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(
  router, document.getElementById('app')
);

