import axios from 'axios';

export const MENU_BONFIRES = 'MENU_BONFIRES';
export const USER_INFO = 'USER_INFO';

export function getUserBonfiresDrawer(userId) {
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

export function getUserInfo(userId) {
  const userBonfires = axios.get('user/' + userId);
  return (dispatch) => {
    return userBonfires
    .then((response) => {
      dispatch({
        type: USER_INFO,
        payload: {
          bonfires: response.data
        }
      })
    })
  }
}