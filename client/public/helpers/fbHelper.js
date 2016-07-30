import { browserHistory } from 'react-router';

export const facebookInit = () => {
	window.fbAsyncInit = () => {
    FB.init({
      appId: '708986855908181',
      xfbml: true,
      version: 'v2.7'
    });

    FB.getLoginStatus((response) => {
      console.log(response);
      statusChangeCallBack(response);
    });
  };

  ((d, s, id) => {
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7&appId=708986855908181";;
     fjs.parentNode.insertBefore(js, fjs);
   })(document, 'script', 'facebook-jssdk');
}


export const checkLoginStatus = () => {
	FB.getLoginStatus((response) => { 
      statusChangeCallBack(response);
  });
};

export const facebookLogin = () => {
  FB.login(checkLoginStatus());
};
  
const statusChangeCallBack = (response) => {
    console.log(response);
    if(response.status === 'connected') {
      // this.getFriendsList();
      browserHistory.push('/Home');
    } else if (response.status === 'not authorized') {
      console.log('Please login to Facebook');
    }
  }