import axios from 'axios';

export const ADD_MARKER = 'ADD_MARKER';
export const ADD_USER = 'ADD_USER';

export function addMarker(data) {
  // console.log(data, 'what is dispatch')
  // return function (dispatch) {
  //   axios()
  // }
  return ({
      type: ADD_MARKER, 
      payload: data 
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