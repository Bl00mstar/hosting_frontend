import fileTypes from './file.types';

const initialState = {
  tree: { isLoading: false, folders: [], files: [], path: '/' },
  trash: { isLoading: false, files: [] },
  alert: { folder: { isMsg: false, msg: '' } },
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case fileTypes.SET_DIRECTORY_PATH:
      return {
        ...state,
        tree: { ...state.tree, path: action.payload },
      };
    case fileTypes.GET_FILE_LIST:
      return {
        ...state,
        tree: {
          ...state.tree,
          isLoading: false,
          folders: [],
          files: [],
        },
      };
    case fileTypes.LOAD_TRASH_LIST:
      return {
        ...state,
        trash: { ...state.trash, isLoading: true },
      };
    case fileTypes.SET_TRASH_LIST:
      return {
        ...state,
        trash: {
          ...state.trash,
          isLoading: false,
          files: action.payload.files,
        },
      };
    case fileTypes.LOAD_FILE_LIST:
      return {
        ...state,
        tree: { ...state.tree, isLoading: true, folders: [], files: [] },
      };
    case fileTypes.SET_FILE_LIST:
      return {
        ...state,
        tree: {
          ...state.tree,
          isLoading: false,
          folders: action.payload.directories,
          files: action.payload.files,
        },
      };
    default:
      return state;
  }
};

export default fileReducer;
