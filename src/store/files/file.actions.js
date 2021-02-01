import fileTypes from './file.types';
//
// ACTION MANAGEMENT
//
export const folderChecked = (data) => {
  return { type: fileTypes.FOLDERS_CHECKED, payload: data };
};
export const filesChecked = (data) => {
  return { type: fileTypes.FILES_CHECKED, payload: data };
};
export const itemSelected = (data) => {
  return { type: fileTypes.ITEM_SELECTED, payload: data };
};
//
// FILE MANAGEMENT
//
export const downloadFile = (data) => {
  return { type: fileTypes.DOWNLOAD_FILE, payload: data };
};
export const uploadFile = (data) => {
  return { type: fileTypes.UPLOAD_FILE, payload: data };
};

//
// FOLDERS MANAGEMENT
//

export const clearFolderAlerts = () => {
  return { type: fileTypes.CLEAR_FOLDER_ALERTS };
};
export const alertFolderError = (data) => {
  return { type: fileTypes.FOLDER_ALERT_ERROR, payload: data };
};
export const alertFolderSuccess = (data) => {
  return { type: fileTypes.FOLDER_ALERT_SUCCESS, payload: data };
};
export const createNewFolder = (data) => {
  return { type: fileTypes.CREATE_NEW_FOLDER, payload: data };
};
export const deleteFolder = (data) => {
  return { type: fileTypes.DELETE_FOLDER, payload: data };
};
export const renameFolder = (data) => {
  return { type: fileTypes.RENAME_FOLDER, payload: data };
};

//
// LOAD & GET FILES
//
export const setDirectoryPath = (data) => {
  return { type: fileTypes.SET_DIRECTORY_PATH, payload: data };
};

export const getUserFiles = (data) => {
  return { type: fileTypes.GET_FILE_LIST, payload: data };
};
export const putFileData = (data) => {
  return { type: fileTypes.SET_FILE_LIST, payload: data };
};

export const loadUserFiles = () => {
  return { type: fileTypes.LOAD_FILE_LIST };
};
//
// TRASH ACTIONS
//
export const getUserTrash = () => {
  return { type: fileTypes.GET_TRASH_LIST };
};

export const putTrashData = (data) => {
  return { type: fileTypes.SET_TRASH_LIST, payload: data };
};

export const loadUserTrash = () => {
  return { type: fileTypes.LOAD_TRASH_LIST };
};
