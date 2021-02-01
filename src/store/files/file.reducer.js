import fileTypes from './file.types';

const initialState = {
  tree: { isLoading: false, folders: [], files: [], path: '/' },
  trash: { isLoading: false, files: [] },
  alert: { folder: { successMsg: '', errorMsg: '' } },
  items: {
    checked: { files: [], folders: [] },
    selected: { type: '', item: '' },
  },
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case fileTypes.ITEM_SELECTED:
      return {
        ...state,
        items: {
          ...state.items,
          selected: { type: action.payload.type, item: action.payload.item },
        },
      };
    case fileTypes.FILES_CHECKED:
      return {
        ...state,
        items: {
          ...state.items,
          checked: {
            ...state.items.checked,
            files: action.payload,
          },
        },
      };
    case fileTypes.FOLDERS_CHECKED:
      if (state.items.checked.folders.includes(action.payload)) {
        let newFoldersArray = state.items.checked.folders.filter(
          (el) => el !== action.payload
        );
        return {
          ...state,
          items: {
            ...state.items,
            checked: {
              ...state.items.checked,
              folders: newFoldersArray,
            },
          },
        };
      } else {
        return {
          ...state,
          items: {
            ...state.items,
            checked: {
              ...state.items.checked,
              folders: [...state.items.checked.folders, action.payload],
            },
          },
        };
      }

    case fileTypes.CLEAR_FOLDER_ALERTS:
      return {
        ...state,
        alert: {
          ...state.alert,
          folder: { folder: { successMsg: '', errorMsg: '' } },
        },
      };
    case fileTypes.FOLDER_ALERT_ERROR:
      return {
        ...state,
        alert: {
          ...state.alert,
          folder: { ...state.alert.folder, errorMsg: action.payload },
        },
      };
    case fileTypes.FOLDER_ALERT_SUCCESS:
      return {
        ...state,
        alert: {
          ...state.alert,
          folder: { ...state.alert.folder, successMsg: action.payload },
        },
      };
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
