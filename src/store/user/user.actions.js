import userTypes from './user.types';

export const isUserAuthenticated = () => {
  return { type: userTypes.CHECK_USER_AUTHENTICATED };
};

export const isUserLoaded = () => {
  return { type: userTypes.USER_LOADED };
};

export const userSignup = (data) => {
  return { type: userTypes.USER_SIGNUP, payload: data };
};

export const userLogin = (data) => {
  return { type: userTypes.USER_LOGIN, payload: data };
};

export const userLoading = () => {
  return { type: userTypes.USER_LOADING };
};

export const userData = (data) => {
  return { type: userTypes.USER_DATA, payload: data };
};

export const handleUserError = (data) => {
  return { type: userTypes.USER_ERROR, payload: data };
};
export const handleClearError = () => {
  return { type: userTypes.USER_CLEAR };
};
export const handleSignupSuccess = (data) => {
  return { type: userTypes.SIGNUP_SUCCESS, payload: data };
};
export const handleSignupClear = () => {
  return { type: userTypes.SIGNUP_CLEAR };
};
