import playlistTypes from './playlist.types';

const initialState = {
  list: [],
  chosenList: null,
  playFile: { id: '', active: false, file: {} },
};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
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
