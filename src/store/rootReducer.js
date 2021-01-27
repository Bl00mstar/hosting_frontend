import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import fileReducer from './files/file.reducer';

export default combineReducers({
  user: userReducer,
  file: fileReducer,
});
