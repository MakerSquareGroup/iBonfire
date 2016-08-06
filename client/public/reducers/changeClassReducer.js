import { LOAD_MODAL } from '../actions/index';
import { CLOSE_MODAL } from '../actions/index';
import { BAD_SUBMISSION } from '../actions/index';

const INITIAL_STATE = {
  changed: {
    bonfireModal: 'hidden',
    modelTextBox: 'hidden',
    showModal: 'hidden',
    textColor: {
      color: 'white'
    }
  }
}

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case LOAD_MODAL:
      return {...state, changed: action.payload.class};
    case CLOSE_MODAL:
      return {...state, changed: action.payload.class};
    case BAD_SUBMISSION:
      return {...state, changed: action.payload.class};
  }
  return state;
}