import { CHANGE_CLASSNAME } from '../actions/index';

const INITIAL_STATE = {
  hidden: 'hidden'
}

export default function(state = INITIAL_STATE, action) {
  console.log(action.type, 'what is the payload')
  console.log('this is change_classname:', CHANGE_CLASSNAME);
  switch(action.type) {
    case CHANGE_CLASSNAME:
      console.log(state, 'STATE IN REDUCER CLASNAME')
      console.log('this is being returned:', action.payload.bonfireModal);
      return action.payload.bonfireModal;
  }
  console.log(state, 'sstate in jibfdjdksfbj');
  return state;
}