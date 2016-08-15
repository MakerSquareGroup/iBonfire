import { ADD_USER }from '../actions/index';
import { USER_DATA } from '../actions/index';
import { UPDATE_USER_INFO } from '../actions/profile';

const initialState = {
  users: [],
  userData: {},
  
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_USER:
      return {
        ...state, 
        users: [...state.users, action.user]
      };
    case USER_DATA:
      return {
        ...state,
        userData: action.payload.user
      };
  }

  return state;
}