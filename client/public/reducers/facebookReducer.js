import { CURRENT_USER } from '../actions/index';

export default function(state = {}, action) {
  switch(action.type) {
    case CURRENT_USER:
      return action.user;
  }
  return state;
}