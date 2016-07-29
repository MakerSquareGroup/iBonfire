import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import FacebookLogin from 'react-facebook-login';
import {FacebookInit, CheckLoginStatus} from '../Actions/FacebookActions';

export default class Login extends Component {
  
  componentWillMount(){
    
  }
  componentDidMount() {
   
  }

 
 

  

  handleLoginClick() {
    FB.login(CheckLoginStatus());
  }

  

  responseFacebook(response) {
    console.log(response);
  }

  render() {
    return (
      <div id="Login">
        <video  id="bgvid" autoPlay loop muted>
          <source src="../media/Indoor-Market/MP4/Indoor-Market.mp4" type="video/mp4"/>
          <source src="../media/Indoor-Market/WEBM/Indoor-Market.webm" type="video/webm"/>
        </video>
        <button id="FacebookLoginButton" type="button" onClick={this.handleLoginClick}>Login</button>
        <div id="Logo">
          <img src="../media/iBonfireLogo.png"/>
        </div>
      </div>
    )
  }
}
       