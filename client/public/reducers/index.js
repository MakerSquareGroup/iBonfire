import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer';
import markerReducer from './markerReducer';

const rootReducer = combineReducers({
  markers: markerReducer
})

export default rootReducer;