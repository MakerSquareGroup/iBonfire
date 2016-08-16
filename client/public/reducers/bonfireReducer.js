import { JOIN_BONFIRE } from '../actions/index';
import { GET_USER_BONFIRES } from '../actions/profile.js';

const initialState = {
  bonfireId: "",
  users: [],
  bonfires: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case JOIN_BONFIRE:
      return {...state, 
        bonfireId: action.payload.bonId,
        users: [...state.users, action.payload.userId]
      };
    case GET_USER_BONFIRES:
      return {
        ...state,
        bonfires: action.payload.bonfires
      }
  }

  return state;
}