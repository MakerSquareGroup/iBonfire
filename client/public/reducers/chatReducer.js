import { CREATE_ROOM } from '../actions/chats';
import { ADD_MESSAGE } from '../actions/chats';
import { GET_MESSAGES } from '../actions/chats';

const initialState = {
  roomId: "",
  messageData: "",
  messages: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case CREATE_ROOM:
      return {
        ...state,
        roomId: action.payload.roomId
      }
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [ action.payload.messageData ,...state.messages],
        messageData: action.payload.messageData
      }
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload.messages
      }
  };
  return state;
};