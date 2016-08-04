import { ADD_MARKER } from '../actions/index';

export default function(state = [], action) {
  switch(action.type){
    case ADD_MARKER:
      return [...state, action.payload];
  }
  return state;
}