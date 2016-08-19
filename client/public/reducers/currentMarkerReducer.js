import { CURRENT_MARKER } from '../actions/index';

const initialState = {
  currMarker: ""
};

export default (state = initialState, action) => {
  switch(action.type){
    case CURRENT_MARKER:
      return action.currMarker.position;
  }
  return state;
}