import { MENU_BONFIRES, USER_INFO } from '../actions/menuActions';

export default (state = {}, action) => {
  switch(action.type) {
    case MENU_BONFIRES:
      return action.payload;
    case USER_INFO:
      return action.payload;
  };
  return state;
};

