import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer';
import markerReducer from './markerReducer';
import userReducer from './userReducer';
import locationReducer from './locationReducer';
import changeClassReducer from './changeClassReducer'
import searchUserInputReducer from './searchUserInputReducer';
import convertLocationReducer from './convertLocationReducer';
import convertCoordsReducer from './convertCoordsReducer';
import facebookReducer from './facebookReducer';

const rootReducer = combineReducers({
  markers: markerReducer,
  users: userReducer,
  location: locationReducer,
  changeClass: changeClassReducer,
  searchUserInputReducer: searchUserInputReducer,
  convertLocation: convertLocationReducer,
  convertCoords: convertCoordsReducer,
  facebook: facebookReducer
});

export default rootReducer;