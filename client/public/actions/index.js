import axios from 'axios';
import { browserHistory } from 'react-router';

export const ADD_MARKER = 'ADD_MARKER';
export const ADD_USER = 'ADD_USER';

export const GET_LOCATION = 'GET_LOCATION';
export const CHANGE_CLASSNAME = 'CHANGE_CLASSNAME';

export const CONVERT_LATLONG = 'CONVERT_LATLONG';
export const CONVERT_LOCATION = 'CONVERT_LOCATION';
export const SEARCH_USER_LOCATION = 'SEARCH_USER_LOCATION';


export function addMarker(data) {
  return ({
    type: ADD_MARKER,
    payload: data
  })
}

export function changeClassName() {
  console.log('inside changeCLassName action creator', CHANGE_CLASSNAME);
  return ({
    type: CHANGE_CLASSNAME,
    payload: {bonfireModal: 'bonfireModal'}
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
  if(navigator.geolocation) {
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
        dispatch({
          type: GET_LOCATION,
          position: position
        })
      });
    }
  }
}

// searchAction('test');

// searchAction is called by the search form in the navbar and takes in an address, uses the convertLocationToCoords
// to convert the location to latitude and longitude, then re-centers the map on that location

export function searchAction(searchValue) {
  console.log(searchValue, "THIS IS THE SEARCH VALUE")
}

// convertCoordsToLocation takes in a latitude and longitude and returns an address
// Example API call:
// https://maps.googleapis.com/maps/api/geocode/json?latlng=44.4647452,7.3553838&sensor=true

export function convertCoordsToLocation(latlng) {
  return new Promise(function(resolve, reject) {
    let response;
    let address;
    resolve(axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&sensor=true')
        .then(function(payload) {
          response = payload.data.results[0].formatted_address;
          address = {
            location: response
          };
          return {
            data: address
          }
        }))
      .catch(function(response) {
        console.log(response, 'Error inside convertCoordsToLocation in Actions');
      })
  })
}

// convertLocationToCoords takes in a latitude and longitude and returns an address
// Example API call:
// https://maps.googleapis.com/maps/api/geocode/json?address=santamonica,ca&sensor=true

export function convertLocationToCoords(location) {
  return new Promise(function(resolve, reject) {
    let response;
    let coords;
    resolve(axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + location + '&sensor=true')
        .then(function(payload) {
          response = payload.data.results[0].geometry.location;
          coords = {
            latitude: response.lat,
            longitude: response .lng
          };
          return {
            data: coords
          }
        }))
      .catch(function(response) {
        console.log(response, 'Error inside convertLocationToCoords in Actions');
      })
  })
}


