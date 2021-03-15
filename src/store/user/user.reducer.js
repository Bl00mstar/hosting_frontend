import userTypes from './user.types';

const initialState = {
  isUserLoaded: false,
  details: { token: '', user: '', isLoading: false, isAuthenticated: false },
  error: { isError: false, msgError: '' },
  action: { isSignupSuccess: false, signupSuccessMessage: '' },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.USER_LOGOUT:
      localStorage.removeItem('authorization');
      return {
        ...state,
        details: {
          token: '',
          user: '',
          isLoading: false,
          isAuthenticated: false,
        },
      };
    case userTypes.USER_DATA:
      localStorage.setItem('authorization', action.payload.token);
      return {
        ...state,
        details: {
          token: action.payload.token,
          user: action.payload.user,
          isLoading: false,
          isAuthenticated: true,
        },
        error: { isError: false, msgError: '' },
        action: { isSignupSuccess: false, signupSuccessMessage: '' },
      };
    case userTypes.USER_LOADED:
      return {
        ...state,
        isUserLoaded: true,
      };
    case userTypes.USER_LOADING:
      return {
        ...state,
        details: { ...state.details, isLoading: true },
      };
    case userTypes.USER_ERROR:
      return {
        ...state,
        details: { ...state.details, isLoading: false },
      };
    case userTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        action: {
          isSignupSuccess: true,
          signupSuccessMessage: action.payload,
        },
      };
    case userTypes.SIGNUP_CLEAR:
      return {
        ...state,
        action: {
          isSignupSuccess: false,
          signupSuccessMessage: '',
        },
      };
    default:
      return state;
  }
};

export default userReducer;
