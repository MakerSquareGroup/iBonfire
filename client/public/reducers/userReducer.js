import ADD_USER from '../actions/index';

export default (state = [], action) => {
  switch(action.type) {
    case ADD_USER:
      return [...state, action.user];
  }

  return state;
}