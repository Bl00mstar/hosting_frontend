import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import fileReducer from './files/file.reducer';
import playlistReducer from './playlists/playlist.reducer';
import alertReducer from './alerts/alert.reducer';

export default combineReducers({
  alert: alertReducer,
  user: userReducer,
  file: fileReducer,
  playlist: playlistReducer,
});
