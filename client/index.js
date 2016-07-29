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

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleWare(reducer);

const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <IndexRoute component={Login} />
        <Route path="/Home" component={Home} />
      </Route>
      	
    </Router>
  </Provider>
)

ReactDOM.render(
  router, document.getElementById('app')
);
