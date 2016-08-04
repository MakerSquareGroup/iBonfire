import { SEARCH_USER_INPUT } from '../actions/index';

const initialState = {
  searchCoords: {
    latitude: "",
    longitude: ""
  }
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SEARCH_USER_INPUT:
      return { ...state, searchCoords: action.searchCoords };
  };
  return state;
};