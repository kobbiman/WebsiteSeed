import { combineReducers } from 'redux';
import loginReducer from './login';

const combinedReducers = combineReducers({
  loginReducer
});

export default combinedReducers;