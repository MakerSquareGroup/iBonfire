import { HOVER_MARKER } from '../actions/index';
import { DISPLAY_MODAL } from '../actions/index';
import { HIDE_MODAL } from '../actions/index';

const initialState = {
  markerData: "",
  windowOpen: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case HOVER_MARKER:
      return { ...state, markerData: action.payload };
    case DISPLAY_MODAL:
      return { ...state, windowOpen: action.payload.windowOpen };
    case HIDE_MODAL:
      return { ...state, windowOpen: action.payload.windowOpen };
  }
  return state;
}