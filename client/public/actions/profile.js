import axios from 'axios';

export const GET_USER_BONFIRES = 'GET_USER_BONFIRES';

export function getUserBonfires(userId){
  const grabBonfiresDB = axios.get('/bonfire/join_bonfire/' + userId);
  return (dispatch) => {
    return grabBonfiresDB.then((response) => {
      dispatch({
        type: GET_USER_BONFIRES,
        payload: {
          bonfires: response.data
        }
      })
    })
  }
}