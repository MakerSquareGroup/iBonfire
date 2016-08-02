import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer';
import markerReducer from './markerReducer';
import userReducer from './userReducer';
import locationReducer from './locationReducer';

const rootReducer = combineReducers({
  markers: markerReducer,
  users: userReducer,
  location: locationReducer
});

export default rootReducer;