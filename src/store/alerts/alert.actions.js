import alertTypes from './alert.types';

export const setMessage = (data) => {
  return { type: alertTypes.SET_MESSAGE, payload: data };
};

export const clearMessage = () => {
  return { type: alertTypes.CLEAR_MESSAGE };
};
