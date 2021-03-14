import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import fileReducer from './files/file.reducer';
import playlistReducer from './playlists/playlist.reducer';

export default combineReducers({
  user: userReducer,
  file: fileReducer,
  playlist: playlistReducer,
});
