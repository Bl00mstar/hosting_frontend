import playlistTypes from './playlist.types';

export const setFilesPlaylist = (data) => {
  return { type: playlistTypes.PLAYLIST_FILES_SET, payload: data };
};

export const filesFromPlaylist = (data) => {
  return { type: playlistTypes.PLAYLIST_FILES, payload: data };
};

export const addFileToPlaylist = (data) => {
  return { type: playlistTypes.PLAYLIST_ADD_FILE, payload: data };
};

export const deleteFileFromPlaylist = (data) => {
  return { type: playlistTypes.PLAYLIST_DELETE_FILE, payload: data };
};

export const selectFile = (data) => {
  return { type: playlistTypes.PLAYLIST_SELECT_FILE, payload: data };
};

//used
export const playFile = (data) => {
  return { type: playlistTypes.PLAY_FILE, payload: data };
};

export const setActiveFile = (data) => {
  return { type: playlistTypes.SET_ACTIVE_FILE, payload: data };
};

export const getFileData = (data) => {
  return { type: playlistTypes.GET_FILE_DATA, payload: data };
};

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
