import SEARCH_USER_INPUT from '../actions/index';

export default (state = {}, action) => {
  switch(action.type) {
    case SEARCH_USER_INPUT:
      return action.payload;
  };
  return state;
};