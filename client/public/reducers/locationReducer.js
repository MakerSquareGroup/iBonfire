import { GET_LOCATION } from '../actions/index';

const INITIAL_STATE = {
  lat: -25.363882,
  lng: 131.044922
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_LOCATION:
      return action.position;
  }
  return state;
}