import { SHOW_DRAWER } from '../actions/drawer';

const initialState = false

export default (state = initialState, action) => {
  // console.log(action.type, 'action.type')
  // console.log(action.payload, 'action.payload')
  switch(action.type) {
    case SHOW_DRAWER:
      return action.payload
    }
  return state;
};