import CONVERT_LOCATION from '../actions/index';

export default (state = {}, action) => {
  switch(action.type) {
    case CONVERT_LOCATION:
      return action.payload;
  };
  return state;
};