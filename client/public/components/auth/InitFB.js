import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { facebookInit, checkLoginStatus } from '../../helpers/fbHelper';

export default (CheckedComponent) => {
  return class InitFB extends Component {
    componentWillMount() {
      if(!window.isLoaded) {
        console.log("Loading Facebook SDK");
        facebookInit();
      }
    }

    componentDidMount() {
      if(window.isLoaded) {
        checkLoginStatus();
      }
    }

    render() {
      if(window.isLoaded) {
        return <CheckedComponent {...this.props} />
      } else {
        return (
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        )
      }
    }
  }
};