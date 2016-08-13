import { MENU_BONFIRES } from '../actions/menuActions';

export default (state = {}, action) => {
  switch(action.type) {
    case MENU_BONFIRES:
      return action.payload;
  };
  return state;
};

