import { CURRENT_MARKER } from '../actions/index';

const initialState = {
  currMarker: ""
}

export default function(state = initialState, action) {
  switch(action.type){
    case CURRENT_MARKER:
      console.log("WE'RE DOING IT LIVE", action.currMarker);
      return action.currMarker.position;
  }
  return state;
}