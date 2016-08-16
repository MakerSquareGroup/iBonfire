import axios from 'axios';
import { browserHistory } from 'react-router';

export const CREATE_ROOM = 'CREATE_ROOM';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const GET_MESSAGES = 'GET_MESSAGES';
export const SET_CHAT_ID = 'SET_CHAT_ID';

export function addMessage(data) {
  const add = axios.post('/chat/' + data.bonfireId, data);

  return (dispatch) => {
    return add
      .then((response) => {
        dispatch({
          type: ADD_MESSAGE,
          payload: {
            messageData: data
          }
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export function getMessages(bonId) {
  const getAll = axios.get('/chat/' + bonId);

  return (dispatch) => {
    return getAll
      .then((response) => {
        dispatch({
          type: GET_MESSAGES,
          payload: {
            messages: response.data
          }
        })
  browserHistory.push('/chats/' + bonId);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export function setChatId(bonId) {
  console.log('Setting chat ID to ', bonId);
  return {
    type: SET_CHAT_ID,
    payload: bonId
  }
}