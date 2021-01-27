import fileTypes from './file.types';

export const getUserFiles = () => {
  return { type: fileTypes.FILE_LIST };
};
