import axios from 'axios';
import { browserHistory } from 'react-router';

export const ADD_MARKER = 'ADD_MARKER';
export const ADD_USER = 'ADD_USER';
export const GET_LOCATION = 'GET_LOCATION';
export const CHANGE_CLASSNAME = 'CHANGE_CLASSNAME';
export const CONVERT_LATLONG = 'CONVERT_LATLONG';
export const CONVERT_LOCATION = 'CONVERT_LOCATION';
export const SEARCH_USER_INPUT = 'SEARCH_USER_INPUT';


export function sendDescription(modalObj) {
  
}

export function addMarker(data) {
  return ({
    type: ADD_MARKER,
    payload: data
  })
}

export function changeClassName(boollean) {
  if(boollean === true) {
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

export function addUser(user, picture) {
  const userObject = {
    name: user.name,
    FB_id: user.id,
    FB_img: picture,
    FB_timeline: user.link,
    latitude: "",
    longitude: "",
    location: "Santa Monica"
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
      return location.then((position) => {
        console.log(position);
        dispatch({
          type: GET_LOCATION,
          position: position
        })
      });
    }
  }
}

// searchAction is called by the search form in the navbar and takes in an address to convert it to
// latitude and longitude coordinates to recenter map on 

export function searchAction(searchValue) {
  const convertedLocation = new Promise((resolve, reject) => {
    let response;
    let coords;
    resolve(axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + searchValue + '&sensor=true'))
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
        console.log(response, 'Error inside searchAction in Actions');
      });
  });

  return (dispatch) => {
    return convertedLocation.then((coords) => {
      dispatch({
        type: SEARCH_USER_INPUT,
        coords: coords
      });
    });
  };
};

// convertCoordsToLocation takes in a latitude and longitude and returns an address
// Example API call:
// https://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&sensor=true

export function convertCoordsToLocation(latlng) {
  const apiCall = new Promise((resolve, reject) => {
    let response;
    let address;
    resolve(axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&sensor=true'))
      .then((payload) => {
        response = payload.data.results[0].formatted_address;
        address = {
          location: response
        };
        return {
          data: address
        };
      })
      .catch((response) => {
        console.log(response, 'Error inside convertCoordsToLocation in Actions');
      });
  });

  return (dispatch) => {
    return apiCall.then((location) => {
      dispatch({
        type: CONVERT_LATLONG,
        location: location
      });
    });
  };
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