import playlistTypes from './playlist.types';

const initialState = {
  list: [],
  chosenList: null,
  playFile: { active: false, file: {} },
};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case playlistTypes.SET_PLAYLISTS:
      return {
        ...state,
        list: action.payload,
      };
    case playlistTypes.SET_ACTIVE_FILE:
      return {
        ...state,
        playFile: { active: true, file: action.payload.data },
      };
    default:
      return state;
  }
};

export default playlistReducer;
