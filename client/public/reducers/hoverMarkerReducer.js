import { HOVER_MARKER } from '../actions/index';
import { DISPLAY_MODAL } from '../actions/index';
import { HIDE_MODAL } from '../actions/index';
import { JOINED_USERS } from '../actions/index';

const initialState = {
  markerData: "",
  windowOpen: false,
  joinedUsers: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case HOVER_MARKER:
      return { ...state, markerData: action.payload};
    case JOINED_USERS:
      return { ...state, joinedUsers: action.joinedUsers, windowOpen: action.payload.windowOpen }
    case DISPLAY_MODAL:
      return { ...state, windowOpen: action.payload.windowOpen};
    case HIDE_MODAL:
      return { ...state, windowOpen: action.payload.windowOpen };
  }
  return state;
}