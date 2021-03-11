import playlistTypes from './playlist.types';

const initialState = {
  list: [],
  chosenList: { list: null, files: [] },
  playFile: { id: '', active: false, file: {} },
  selectedFile: {},
};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case playlistTypes.PLAYLIST_FILES_SET:
      console.log(action.payload.filesData);
      return {
        ...state,
        chosenList: {
          ...state.chosenList,
          list: action.payload.playlist,
          files: action.payload.filesData,
        },
      };
    case playlistTypes.PLAYLIST_SELECT_FILE:
      return {
        ...state,
        selectedFile: action.payload,
      };
    case playlistTypes.PLAY_FILE:
      return {
        ...state,
        playFile: {
          ...state.playFile,
          id: action.payload,
        },
      };
    case playlistTypes.SET_PLAYLISTS:
      return {
        ...state,
        list: action.payload,
      };
    case playlistTypes.SET_ACTIVE_FILE:
      return {
        ...state,
        playFile: { active: true, file: action.payload },
      };
    default:
      return state;
  }
};

export default playlistReducer;
