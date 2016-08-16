import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { facebookInit, checkLoginStatus } from '../../helpers/fbHelper';
import * as actions from '../../actions/index';
import FBLogin from '../FBLogin';
import App from '../App';
import Home from '../Home';

const Wrapper = (CheckedComponent) => {
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

      if(!localStorage.getItem('latitude') || !localStorage.getItem('longitude') && !window.gettingLocation) {
        this.props.getLocation();
      }

      this.props.getMarkers();
    }

    render() {
      if(window.isLoaded && window.statusChecked && !this.props.facebook.loggedIn) {
        return <FBLogin {...this.props} />
      }

      if(!window.isLoaded || !window.statusChecked || window.gettingLocation) {
        return (
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        )
      }

      if(this.props.facebook.loggedIn) {
        return <CheckedComponent {...this.props} />
      }
    }
  }
};

const mapStateToProps = state => {
  return {
    markers: state.markers,
    users: state.users,
    location: state.location,
    facebook: state.facebook
  }
}

const WrappedComponent = (CheckedComponent) => (
  connect(mapStateToProps, actions)(Wrapper(CheckedComponent))
  )

export default WrappedComponent;