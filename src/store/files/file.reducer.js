import fileTypes from './file.types';

const initialState = {};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case fileTypes.FILE_LIST:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default fileReducer;
