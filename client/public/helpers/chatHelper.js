import axios from 'axios';

export const getChatMessages = () => {
  const getMessages = axios.get('/bonfireChat', 12342523);
  return getMessages
  .then((response) => {
    return response;
  })
}

export const addChatMessage = (messageObj) => {
  const addMessage = axios.post('/bonfireChat', {messages: 'Haroow', id_Users: 1235238736, id_Bonfires: 12342523});
  return addMessage
  .then((response) => {
    return response;
  })
}