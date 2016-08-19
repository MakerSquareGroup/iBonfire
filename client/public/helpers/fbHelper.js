import { browserHistory } from 'react-router';
import * as actionCreators from '../actions/index';
import axios from 'axios';
import { USER_DATA } from '../actions/index';
import { store } from '../../index';
import { LOGIN_SUCCESSFUL } from '../actions/index';
import { LOG_OUT } from '../actions/index';

export const facebookInit = () => {
  window.isLoaded = false;
  window.statusChecked = false;
  window.fbAsyncInit = () => {
    // console.log("Facebook SDK initialized");
    FB.init({
      appId: '708986855908181',
      xfbml: true,
      cookie: true,
      version: 'v2.7'
    });

    window.isLoaded = true;

    FB.getLoginStatus((response) => {
      if(!response.authResponse) {
        browserHistory.push('/login');
      }
      statusChangeCallBack(response);
    });
  };

  ((d, s, id) => {
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   })(document, 'script', 'facebook-jssdk');
}

export const checkLoginStatus = () => {
  FB.getLoginStatus((response) => {
    statusChangeCallBack(response);
  });
};

const statusChangeCallBack = (response) => {
    if(response.status === 'connected') {
      window.statusChecked = true;
      axios.get('/user/' + response.authResponse.userID).then((response) => {
        store.dispatch({
          type: USER_DATA, 
          payload: { 
            user: response.data 
          }
        })
      })
      .then(() => {
        store.dispatch({
          type: LOGIN_SUCCESSFUL,
          loggedIn: true
        })
      });
    } else if (response.status === 'not authorized' || !response.authResponse) {
      // console.log('Please login to Facebook');
      window.statusChecked = true;
      store.dispatch({
        type: LOG_OUT,
        loggedIn: false
      })
    }
}