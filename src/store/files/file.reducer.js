import fileTypes from './file.types';

const initialState = {
  tree: { isLoading: false, items: [], path: '/' },
  trash: { isLoading: false, items: [] },
  alert: { folder: { message: '', type: '' } },
  action: {
    folders: [],
    checked: { items: [] },
    selected: { type: '', id: '', name: '' },
  },
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case fileTypes.MOVE_FOLDER:
      return {
        ...state,
        action: {
          ...state.action,
          folders: action.payload.searchedFolders,
        },
      };
    case fileTypes.ALERT_CLEAR:
      return {
        ...state,
        alert: {
          ...state.alert,
          folder: {
            ...state.alert.folder,
            message: '',
            type: '',
          },
        },
      };
    case fileTypes.ALERT_INFO:
      return {
        ...state,
        alert: {
          ...state.alert,
          folder: {
            ...state.alert.folder,
            message: action.payload.message,
            type: action.payload.type,
          },
        },
      };
    case fileTypes.SET_DIRECTORY_PATH:
      return {
        ...state,
        tree: { ...state.tree, path: action.payload },
      };
    case fileTypes.ITEM_SELECTED:
      return {
        ...state,
        action: {
          ...state.action,
          selected: {
            type: action.payload.type,
            name: action.payload.name,
            id: action.payload.id,
          },
        },
      };
    case fileTypes.ITEM_CHECKED:
      return {
        ...state,
        action: {
          ...state.action,
          checked: {
            ...state.action.checked,
            items: action.payload,
          },
        },
      };
    case fileTypes.LOAD_FILE_LIST:
      return {
        ...state,
        tree: {
          ...state.tree,
          isLoading: true,
        },
      };
    case fileTypes.SET_FILE_LIST:
      return {
        ...state,
        tree: {
          ...state.tree,
          isLoading: false,
          items: action.payload.searchedItems,
        },
      };
    case fileTypes.LOAD_TRASH_LIST:
      return {
        ...state,
        trash: {
          ...state.trash,
          isLoading: true,
        },
      };
    case fileTypes.SET_TRASH_LIST:
      return {
        ...state,
        trash: {
          ...state.trash,
          isLoading: false,
          items: action.payload.searchedItems,
        },
      };

    default:
      return state;
  }
};

export default fileReducer;
