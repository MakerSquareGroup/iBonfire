import axios from 'axios';
import { browserHistory } from 'react-router';

export const CREATE_ROOM = 'CREATE_ROOM';
export const ADD_MESSAGE = 'ADD_MESSAGE';
export const GET_MESSAGES = 'GET_MESSAGES';

export function createChatRoom(bonId) {
  const createRoom = axios.post('/chat/' + bonId);

  return (dispatch) => {
    return createRoom.then((response) => {
      dispatch({
        type: CREATE_ROOM,
        payload: {
          roomId: response.id
        }
      })
    })
  }
}

// takes in an object containing FB_id, message, bonfireId and optionally chatId
// example: 
// data = {
//   bonfireId: bonfireId,
//   message: "Some eloquently written string",
//   FB_id: FB_id,
//   (optional)
//   Chats_id: chatId
// }

export function addMessage(data) {
  const add = axios.post('chat/messages/' + data.bonfireId, data);

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
  }
}

export function getMessages(bonId) {
  const getAll = axios.get('/chat/messages/' + bonId);

  return (dispatch) => {
    return getAll
      .then((response) => {
        dispatch({
          type: GET_MESSAGES,
          payload: {
            messages: response
          }
        })
      })
  }
}