import { SHOW_DRAWER } from '../actions/drawer';

const initialState = false

export default (state = initialState, action) => {
  switch(action.type) {
    case SHOW_DRAWER:
      return action.payload
    }
  return state;
};