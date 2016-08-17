import { combineReducers } from 'redux';
import markerReducer from './markerReducer';
import userReducer from './userReducer';
import locationReducer from './locationReducer';
import changeClassReducer from './changeClassReducer'
import searchUserInputReducer from './searchUserInputReducer';
import convertLocationReducer from './convertLocationReducer';
import convertCoordsReducer from './convertCoordsReducer';
import facebookReducer from './facebookReducer';
import currentMarkerReducer from './currentMarkerReducer';
import hoverMarkerReducer from './hoverMarkerReducer';
import bonfireReducer from './bonfireReducer';
import chatReducer from './chatReducer';
import userInfo from './profileButton';
import userBonfires from './profileButton';
import profileReducer from './profileReducer';
import showDrawerReducer from './showDrawerReducer';


const rootReducer = combineReducers({
  markers: markerReducer,
  users: userReducer,
  location: locationReducer,
  changeClass: changeClassReducer,
  search: searchUserInputReducer,
  convertLocation: convertLocationReducer,
  convertCoords: convertCoordsReducer,
  facebook: facebookReducer,
  currMarker: currentMarkerReducer,
  hoverMarker: hoverMarkerReducer,
  bonfire: bonfireReducer,
  userBonfires: userBonfires,
  userInfo: userInfo,
  chat: chatReducer,
  profile: profileReducer,
  showDrawer: showDrawerReducer
});

export default rootReducer;