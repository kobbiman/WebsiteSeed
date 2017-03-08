import { combineReducers } from 'redux';
import loginReducer from './login';
import configurationReducer from './configuration';
import menuReducer from './menu';

const combinedReducers = combineReducers({
  configurationReducer,
  loginReducer,
  menuReducer
});

export default combinedReducers;