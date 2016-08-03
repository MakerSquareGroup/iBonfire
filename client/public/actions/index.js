import axios from 'axios';
import { browserHistory } from 'react-router';

export const ADD_MARKER = 'ADD_MARKER';
export const ADD_USER = 'ADD_USER';
export const GET_LOCATION = 'GET_LOCATION';
export const CHANGE_CLASSNAME = 'CHANGE_CLASSNAME';

export function addMarker(data) {
  return ({
      type: ADD_MARKER, 
      payload: data 
    })
}

export function changeClassName() {
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
    return newUser.then(({data}) => {
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
        // browserHistory.push('/');
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