import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer';
import markerReducer from './markerReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  markers: markerReducer,
  users: userReducer
});

export default rootReducer;