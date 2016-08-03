import CHANGE_CLASSNAME from '../actions/index';

const INITIAL_STATE = {
  hidden: 'hidden'
}

export default function(state = INITIAL_STATE, action) {
  console.log(action.type, 'what is the payload')
  switch(action.type) {
    case CHANGE_CLASSNAME:
      console.log(state, 'STATE IN REDUCER CLASNAME')
      return action.payload.bonfireModal;
  }
  console.log(state, 'sstate in jibfdjdksfbj');
  return state;
}