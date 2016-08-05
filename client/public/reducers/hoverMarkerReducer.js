import { HOVER_MARKER } from '../actions/index';
import { DISPLAY_MODAL } from '../actions/index';
import { HIDE_MODAL } from '../actions/index';

const initialState = {
  markerData: "",
  displayClass: "hidden"
};

export default function(state = initialState, action) {
  switch(action.type) {
    case HOVER_MARKER:
      return { ...state, markerData: action.payload };
    case DISPLAY_MODAL:
      return { ...state, displayClass: action.payload };
    case HIDE_MODAL:
      return { ...state, displayClass: action.payload };
  }
  return state;
}