import { GET_LOCATION } from '../actions/index';

const INITIAL_STATE = {
    lat: null,
    lng: null
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case GET_LOCATION:
      return action.position;
  }
  return state;
}