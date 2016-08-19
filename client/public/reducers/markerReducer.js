import { ADD_MARKER } from '../actions/index';
import { GET_MARKER } from '../actions/index';
import { CURRENT_MARKER } from '../actions/index';

export default (state = [], action) => {
  switch(action.type){
    case ADD_MARKER:
      return [...state, action.payload];
    case GET_MARKER:
      return action.markers;
  }
  return state;
}