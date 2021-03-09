import playlistTypes from './playlist.types';

export const setActiveFile = (data) => {
  return { type: playlistTypes.SET_ACTIVE_FILE, payload: data };
};

export const getFileData = () => {
  return { type: playlistTypes.GET_FILE_DATA };
};

//used

export const editPlaylist = (data) => {
  return { type: playlistTypes.EDIT_PLAYLIST, payload: data };
};

export const deletePlaylist = (data) => {
  return { type: playlistTypes.DELETE_PLAYLIST, payload: data };
};

export const addPlaylist = (data) => {
  return { type: playlistTypes.ADD_PLAYLIST, payload: data };
};

export const setPlaylists = (data) => {
  return { type: playlistTypes.SET_PLAYLISTS, payload: data };
};

export const getPlaylists = () => {
  return { type: playlistTypes.GET_PLAYLISTS };
};
