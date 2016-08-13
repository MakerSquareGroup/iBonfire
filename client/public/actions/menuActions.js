import axios from 'axios';

export const MENU_BONFIRES = 'MENU_BONFIRES';

export function getUserBonfires(userId) {
  const userBonfires = axios.get('bonfire/join_bonfire/' + userId);
  return (dispatch) => {
    return userBonfires
    .then((response) => {
      dispatch({
        type: MENU_BONFIRES,
        payload: {
          bonfires: response.data
        }
      })
    })
  }
}