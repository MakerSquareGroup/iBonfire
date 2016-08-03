import { ADD_MARKER } from '../actions/index';
import { CHANGE_CLASSNAME } from '../actions/index';

const INITIAL_STATE = [
{
  position: {
    lat: -25.363882,
    lng: 131.044922
  },
}
];

export default function(state = INITIAL_STATE, action) {
  switch(action.type){
    case ADD_MARKER:
      return [...state, action.payload];
  }
  return state;
}