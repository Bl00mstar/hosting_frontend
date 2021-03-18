import fileTypes from './file.types';

const initialState = {
  statistics: {
    trash: { countTrashFiles: 0, spaceTrashFiles: 0 },
    storage: { countStorageFiles: 0, spaceStorageFiles: 0 },
  },
  tree: {
    isLoading: false,
    items: [],
    path: '/',
    filters: {
      folder: { type: -1 },
      alpha: { active: true, type: 1 },
      date: { active: false, type: 0 },
    },
  },
  trash: { isLoading: false, items: [], checked: { items: [] } },
  alert: {
    folder: { message: '', type: 'info' },
    trash: { message: '', type: 'info' },
  },
  action: {
    folders: [],
    path: '/',
    checked: { items: [] },
    selected: { type: '', id: '', name: '' },
  },
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case fileTypes.STATISTICS_TRASH_SET:
      console.log(action.payload);
      return {
        ...state,
        statistics: {
          ...state.statistics,
          trash: {
            ...state.statistics.trash,
            spaceTrashFiles: action.payload.totalStorage,
            countTrashFiles: action.payload.countFiles,
          },
        },
      };
    case fileTypes.STATISTICS_STORAGE_SET:
      return {
        ...state,
        statistics: {
          ...state.statistics,
          storage: {
            ...state.statistics.storage,
            countStorageFiles: action.payload.countFiles,
            spaceStorageFiles: action.payload.totalStorage,
          },
        },
      };
    case fileTypes.SET_FILTERS:
      return {
        ...state,
        tree: { ...state.tree, filters: action.payload },
      };

    case fileTypes.TRASH_ALERT:
      return {
        ...state,
        alert: {
          ...state.alert,
          trash: {
            ...state.alert.trash,
            message: action.payload.message,
            type: action.payload.type,
          },
        },
      };
    case fileTypes.TRASH_ALERT_CLEAR:
      return {
        ...state,
        alert: {
          ...state.alert,
          trash: {
            ...state.alert.trash,
            message: '',
            type: 'info',
          },
        },
      };
    case fileTypes.TRASH_SELECTED:
      return {
        ...state,
        trash: {
          ...state.trash,
          checked: {
            ...state.trash.checked,
            items: action.payload,
          },
        },
      };

    case fileTypes.FOLDERS_PATH:
      return {
        ...state,
        action: {
          ...state.action,
          path: action.payload,
        },
      };
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
            type: 'info',
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
