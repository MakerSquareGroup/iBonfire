import axios from 'axios';
import { browserHistory } from 'react-router';

export const ADD_MARKER = 'ADD_MARKER';
export const ADD_USER = 'ADD_USER';
export const GET_LOCATION = 'GET_LOCATION';
export const CHANGE_CLASSNAME = 'CHANGE_CLASSNAME';
export const CONVERT_LATLONG = 'CONVERT_LATLONG';
export const CONVERT_LOCATION = 'CONVERT_LOCATION';
export const SEARCH_USER_INPUT = 'SEARCH_USER_INPUT';
export const CURRENT_USER = 'CURRENT_USER';
export const LOGIN_STATUS = 'LOGIN_STATUS';
export const GET_MARKER = 'GET_MARKER';
export const CURRENT_MARKER = 'CURRENT_MARKER';

export function getMarkers() {
  const grabMarkersDB = axios.get('/api/bonfire');
  return (dispatch) => {
    return grabMarkersDB.then((response) => {
      dispatch({
        type: GET_MARKER,
        markers: response.data
      })
    })
  }
}

export function setCurrentMarker(marker) {
  return ({
      type: CURRENT_MARKER,
      currMarker: marker      
  })
}


export function saveImage(link) {
  return ({
    type: SAVE_IMAGE,
    payload: link
  })
}

export function addMarker(data) {
  return ({
    type: ADD_MARKER,
    payload: data
  })
}

export function changeBonfireModalClassName(animation) {
  if(animation === "fadeOut") {
    return ({
      type: CHANGE_CLASSNAME,
      payload:
      {
        class:
          {
            bonfireModal: 'hidden',
            modelTextBox: 'hidden',
            showModal: 'hidden'
          }
      }
    })
  }

  if(animation === "fadeIn"){
    return ({
      type: CHANGE_CLASSNAME,
      payload: 
      { 
        class: 
           { 
             bonfireModal: 'bonfireModal', 
             modelTextBox: 'modelTextBox',
             showModal: 'showModal'
           }
      }
    })
  }

}

export function addUser(user, picture) {
  const userObject = {
    name: user.name,
    FB_id: user.id,
    FB_img: picture,
    FB_timeline: user.link,
    latitude: "",
    longitude: "",
    cityState: ""
  };

  const newUser = axios.post('/api/user', userObject);

  return (dispatch) => {
    return newUser.then(({
      data
    }) => {
      dispatch({
        type: ADD_USER,
        user: userObject
      })
    });
  }
}

export function sendDescription(modalObj) {
  const sendModal = axios.post('/api/bonfire', modalObj)
  return (dispatch) => {
    return sendModal.then((response) => {
      dispatch({ type: ADD_MARKER, payload: response.data})
    })
    .catch((err) => {
      console.log(err, 'error in sendDescription action');
    })
  }
}

export function getLocation() {
  if (navigator.geolocation) {
    const location = new Promise((resolve, reject) => {
      return navigator.geolocation.getCurrentPosition((position) => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        resolve(pos);
      });
    });

    return (dispatch) => {
      console.log("Getting user location...");
      return location.then((position) => {
        console.log("Success!");
        dispatch({
          type: GET_LOCATION,
          position: position
        })
      })
      .catch((err) => {
        console.log("Unable to get user location!");
      });
    }
  }
}

export function searchAction(searchValue) {
  const convertedLocation = axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + searchValue + '&sensor=true');

  return (dispatch) => {
    return convertedLocation
    .then((response) => {
      let coordsResp = response.data.results[0].geometry.location;
      let coords = {
        latitude: coordsResp.lat,
        longitude: coordsResp.lng
      }
      dispatch({
        type: SEARCH_USER_INPUT,
        searchCoords: coords
      })
    })
    .catch((response) => {
      console.log(response, 'Error searching!');
    });
  };
};

// convertCoordsToLocation takes in a latitude and longitude and returns an address
// Example API call:
// https://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&sensor=true

export function convertCoordsToLocation(latlng) {
const apiCall = axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&sensor=true');
  return (dispatch) => {
    return apiCall.then((location) => {
      return location
    })
    .catch((err) => {
      console.log(err, ": error in convertCoordsToLocation action")
    }) 
  }
};

// convertLocationToCoords takes in a latitude and longitude and returns an address
// Example API call:
// https://maps.googleapis.com/maps/api/geocode/json?address=santamonica,ca&sensor=true

export function convertLocationToCoords(location) {
  const apiCall = new Promise((resolve, reject) => {
    let response;
    let coords;
    resolve(axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&sensor=true'))
      .then((payload) => {
        response = payload.data.results[0].geometry.location;
        coords = {
          latitude: response.lat,
          longitude: response.lng
        };
        return {
          data: coords
        }
      })
      .catch((response) => {
        console.log(response, 'Error inside convertLocationToCoords in Actions');
      });
  });

  return (dispatch) => {
    return apiCall.then((coords) => {
      dispatch({
        type: CONVERT_LOCATION,
        coords: coords
      });
    });
  };
};

export function facebookLogin() {
  return (dispatch) => {
    return FB.login((response) => {
      if(response.authResponse) {
        browserHistory.push('/Home');
        dispatch({
          type: LOGIN_STATUS,
          loggedIn: true
        })
      }
    });
  }
};

export function getCurrentUser() {
  return (dispatch) => {
    return FB.api('/me', 'get', { fields:'id,name,gender,link'}, (response) => {
      let picture = `http://graph.facebook.com/${response.id}/picture?type=large`;
      addUser(response, picture);
      dispatch({
        type: CURRENT_USER,
        user: response
      })
    });
  }
}