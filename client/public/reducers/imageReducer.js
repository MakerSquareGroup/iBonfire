import { SAVE_IMAGE } from '../actions/index';

export default (state = {}, action) => {
  switch(action.type) {
    case SAVE_IMAGE:
      return action.payload;
  }
  return state;
}