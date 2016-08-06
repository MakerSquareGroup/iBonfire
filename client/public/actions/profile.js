import axios from 'axios';

export const GET_USER_BONFIRES = 'GET_USER_BONFIRES';

export function getUserBonfires(userId){
  const grabBonfiresDB = axios.get('/user/' + userId);
  return (dispatch) => {
    return grabBonfiresDB.then((response) => {
      console.log(response, "response");
      dispatch({
        type: GET_USER_BONFIRES,
        payload: {
          bonfires: response.data
        }
      })
    })
  }
}