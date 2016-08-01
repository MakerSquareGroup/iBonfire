import { ADD_MARKER } from '../actions/index';

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
      console.log(state, 'state in the markerReducer')
      console.log('ADD_MARKER action received with payload of : ',action.payload )
      return [...state, action.payload];
  }
  return state;
}