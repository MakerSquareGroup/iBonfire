import axios from 'axios';

export const GET_USER_BONFIRES = 'GET_USER_BONFIRES';
export const UPDATE_USER_BIO = 'UPDATE_USER_BIO';
export const CHANGE_POPUP_DATA = 'CHANGE_POPUP_DATA';

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

export function updateUserBio(userId, bio){
  const data = {
    userId: userId,
    bio: bio
  }
  const updateUserBioDB = axios.put('/user/' + userId, data);
  return (dispatch) => {
    return updateUserBioDB.then((response) => {
      dispatch({
        type: UPDATE_USER_BIO,
        payload: {
          userId
        }
      })
    })
  }
}

export function changePopupData(bonfireData){
  return {
    type: CHANGE_POPUP_DATA,
    payload: {
      bonfireData
    }
  }
}