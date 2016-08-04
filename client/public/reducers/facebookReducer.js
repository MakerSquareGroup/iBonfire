import { CURRENT_USER } from '../actions/index';
import { LOGIN_STATUS } from '../actions/index';

let initialState = {
  currUser: "",
  loggedIn: false
};

export default function(state = initialState, action) {
  switch(action.type) {
    case CURRENT_USER:
      return { ...state, currUser: action.user };

    case LOGIN_STATUS:
      return { ...state, loggedIn: action.loggedIn };
  }

  return state;
}