import alertTypes from './alert.types';

const initialState = {
  message: '',
  type: '',
};
const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case alertTypes.SET_MESSAGE:
      return {
        message: action.payload.message,
        type: action.payload.type,
      };
    case alertTypes.CLEAR_MESSAGE:
      return {
        message: '',
        type: '',
      };
    default:
      return state;
  }
};

export default alertReducer;
