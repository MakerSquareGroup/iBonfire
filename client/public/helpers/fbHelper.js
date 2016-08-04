import { browserHistory } from 'react-router';
import * as actions from '../actions/index';

export const facebookInit = () => {
  window.isLoaded = false;
	window.fbAsyncInit = () => {
    console.log("Facebook SDK initialized");
    FB.init({
      appId: '708986855908181',
      xfbml: true,
      cookie: true,
      version: 'v2.7'
    });

    window.isLoaded = true;

    FB.getLoginStatus((response) => {
      if(!response.authResponse) {
        browserHistory.push('/');
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



export const facebookLogin = () => {
  FB.login((response) => {
    if(response.authResponse) {
      browserHistory.push('/Home');
      return FB.api('/me', 'get', { fields:'id,name,gender,link'}, (response) => {
        let picture = `http://graph.facebook.com/${response.id}/picture?type=large`
        console.log("Thanks for logging in, " + response.name);
        actions.saveImage(picture);
        return actions.addUser(response, picture);
      });
    }
  });
};

export const facebookLogin = () => {
  FB.login((response) => {
    if(response.authResponse) {
      browserHistory.push('/Home');
      return FB.api('/me', 'get', { fields:'id,name,gender,link'}, (response) => {
        let picture = `http://graph.facebook.com/${response.id}/picture?type=large`
        console.log("Thanks for logging in, " + response.name);
        actions.saveImage(picture);
        return actions.addUser(response, picture);
      });
    }
  });
};

export const facebookLogout = () => {
  FB.logout((response) => {
    console.log("Logging out...", response);
    browserHistory.push('/');
  });
}

const statusChangeCallBack = (response) => {
    if(response.status === 'connected') {
      browserHistory.push('/Home');
    } else if (response.status === 'not authorized' || !response.authResponse) {
      console.log('Please login to Facebook');
      browserHistory.push('/');
    }
}