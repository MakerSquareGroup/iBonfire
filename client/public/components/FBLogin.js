import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import FacebookLogin from 'react-facebook-login';

export default class Login extends Component {
  componentDidMount() {
    window.fbAsyncInit = function() {
      FB.init({
        appId: '708986855908181',
        xfbml: true,
        version: 'v2.7'
      });

      FB.getLoginStatus(function(response) { 
        this.statusChangeCallBack(response);
      }.bind(this));
    }.bind(this);

    (function(d, s, id) {
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7&appId=708986855908181";;
       fjs.parentNode.insertBefore(js, fjs);
     } (document, 'script', 'facebook-jssdk'));
  }

  testAPI() {
    console.log("Welcome! Getting your information...");
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
    });
  }

  statusChangeCallBack(response) {
    console.log('statusChangeCallBack');
    console.log(response);
    if(response.status === 'connected') {
      this.testAPI();
    } else if (response.status === 'not authorized') {
      console.log('Please login to Facebook');
    }
  }

  checkLoginStatus() {
    FB.getLoginStatus(function(response) { 
      this.statusChangeCallBack(response);
    }.bind(this));
  }

  handleClick() {
    FB.login(this.checkLoginStatus());
  }

  responseFacebook(response) {
    console.log(response);
  }

  render() {
    return (
      <div>
        <div className='fb-login-button' data-max-rows='1' data-size='medium' data-show-face='false' data-auto-logout-link='false' onClick={this.handleClick}></div>
      </div>
    )
  }
}
        // <FacebookLogin
        //   appId="708986855908181"
        //   autoLoad={true}
        //   fields="name,email,picture"
        //   callback={this.responseFacebook} />