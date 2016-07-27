export default (state = {}, action) => {
  switch(action.type) {
    case 'TEST':
      return action.payload;
  }
  return state;
}