import { combineReducers } from 'redux';
import loginReducer from './login';
import configurationReducer from './configuration';

const combinedReducers = combineReducers({
  configurationReducer,
  loginReducer
});

export default combinedReducers;