import { CURRENT_USER } from '../actions/index';
import { LOGIN_SUCCESSFUL } from '../actions/index';
import { LOG_OUT } from '../actions/index';

let initialState = {
  currUser: "",
  loggedIn: false,
  picture: ''
};

export default function(state = initialState, action) {
  switch(action.type) {
    case CURRENT_USER:
      return { ...state, currUser: action.user,  picture: action.picture};
    case LOGIN_SUCCESSFUL:
      return { ...state, loggedIn: action.loggedIn };
    case LOG_OUT:
      return { ...state, loggedIn: action.loggedIn };
  }

  return state;
}