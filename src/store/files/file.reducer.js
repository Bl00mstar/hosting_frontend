import fileTypes from './file.types';

const initialState = {
  tree: { isLoading: false, items: [], path: '/' },
  trash: { isLoading: false, items: [] },
  alert: { folder: { successMsg: '', errorMsg: '' } },
  action: {
    checked: { items: [] },
    selected: { type: '', id: '', name: '' },
  },
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case fileTypes.SET_DIRECTORY_PATH:
      console.log(action.payload);
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

    // case fileTypes.FOLDERS_CHECKED:
    //   if (state.items.checked.folders.includes(action.payload)) {
    //     let newFoldersArray = state.items.checked.folders.filter(
    //       (el) => el !== action.payload
    //     );
    //     return {
    //       ...state,
    //       items: {
    //         ...state.items,
    //         checked: {
    //           ...state.items.checked,
    //           folders: newFoldersArray,
    //         },
    //       },
    //     };
    //   } else {
    //     return {
    //       ...state,
    //       items: {
    //         ...state.items,
    //         checked: {
    //           ...state.items.checked,
    //           folders: [...state.items.checked.folders, action.payload],
    //         },
    //       },
    //     };
    //   }

    // case fileTypes.CLEAR_FOLDER_ALERTS:
    //   return {
    //     ...state,
    //     alert: {
    //       ...state.alert,
    //       folder: { folder: { successMsg: '', errorMsg: '' } },
    //     },
    //   };
    // case fileTypes.FOLDER_ALERT_ERROR:
    //   return {
    //     ...state,
    //     alert: {
    //       ...state.alert,
    //       folder: { ...state.alert.folder, errorMsg: action.payload },
    //     },
    //   };
    // case fileTypes.FOLDER_ALERT_SUCCESS:
    //   return {
    //     ...state,
    //     alert: {
    //       ...state.alert,
    //       folder: { ...state.alert.folder, successMsg: action.payload },
    //     },
    //   };

    default:
      return state;
  }
};

export default fileReducer;
