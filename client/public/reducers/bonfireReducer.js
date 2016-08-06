import { JOIN_BONFIRE } from '../actions/index';

const initialState = {
  bonfireId: "",
  users: []
};

export default function(state = initialState, action) {
  switch(action.type) {
    case JOIN_BONFIRE:
      return {...state, 
        bonfireId: action.payload.bonId,
        users: [...state.users, action.payload.userId]
      };
  }

  return state;
}