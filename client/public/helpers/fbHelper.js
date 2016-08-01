import { browserHistory } from 'react-router';

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
      console.log(response, "getLoginStatus");
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
      FB.api('/me', (response) => {
        console.log("Thanks for logging in, " + response.name);
      });
    }
  });
};
  
const statusChangeCallBack = (response) => {
    if(response.status === 'connected') {
      browserHistory.push('/Home');
    } else if (response.status === 'not authorized' || !response.authResponse) {
      console.log('Please login to Facebook');
      browserHistory.push('/');
    }
  }