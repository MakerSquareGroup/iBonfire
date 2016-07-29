import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import FacebookLogin from 'react-facebook-login';
import {FacebookInit, CheckLoginStatus} from '../Actions/FacebookActions';

export default class Login extends Component {
  
  componentDidMount() {
    FacebookInit()
  }

 
  statusChangeCallBack(response) {
    if(response.status === 'connected') {
      this.getFriendsList();
    } else if (response.status === 'not authorized') {
      console.log('Please login to Facebook');
    }
  }

  

  handleLoginClick() {
    FB.login(CheckLoginStatus());
  }

  

  responseFacebook(response) {
    console.log(response);
  }

  render() {
    return (
      <div id="LoginPage">
        <div className='fb-login-button' data-max-rows='1' data-size='medium' data-show-face='false' data-auto-logout-link='false' onClick={this.handleLoginClick}></div>
      </div>
    )
  }
}
        // <FacebookLogin
        //   appId="708986855908181"
        //   autoLoad={true}
        //   fields="name,email,picture"
        //   callback={this.responseFacebook} />