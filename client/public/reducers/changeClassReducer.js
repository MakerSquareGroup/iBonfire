import { CHANGE_CLASSNAME } from '../actions/index';

const INITIAL_STATE = {
  hidden: 'hidden'
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case CHANGE_CLASSNAME:
      return action.payload.class;
  }
  return state;
}