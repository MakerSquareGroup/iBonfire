import CONVERT_COORDS from '../actions/index';

export default (state = {}, action) => {
  switch(action.type) {
    case CONVERT_COORDS:
      return action.payload;
  };
  return state;
};