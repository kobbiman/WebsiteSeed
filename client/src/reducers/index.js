import { combineReducers } from 'redux';
import loginReducer from './login';
import configurationReducer from './configuration';
import menuReducer from './menu';
import layoutReducer from './layout';

const combinedReducers = combineReducers({
  configurationReducer,
  layoutReducer,
  loginReducer,
  menuReducer,
});

export default combinedReducers;