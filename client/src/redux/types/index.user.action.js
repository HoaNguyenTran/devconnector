import {
  userConstants
} from "../constants/user.constants";

export const fetchNumOfMemRequest = () => {
  return {
    type: userConstants.FETCH_NUMOFMEM_REQUEST,
  };
};
export const fetchNumOfMemSuccess = (data) => {
  return {
    type: userConstants.FETCH_NUMOFMEM_SUCCESS,
    payload: data,
  };
};
export const fetchNumOfMemFailure = (error) => {
  return {
    type: userConstants.FETCH_NUMOFMEM_FAILURE,
    payload: error,
  };
};

export const fetchSignUpRequest = () => {
  return {
    type: userConstants.FETCH_SIGNUP_REQUEST,
  };
};
export const fetchSignUpSuccess = (data) => {
  return {
    type: userConstants.FETCH_SIGNUP_SUCCESS,
    payload: data,
  };
};
export const fetchSignUpFailure = (error) => {
  return {
    type: userConstants.FETCH_SIGNUP_FAILURE,
    payload: error,
  };
};

export const fetchGetTokenRequest = () => {
  return {
    type: userConstants.FETCH_TOKEN_REQUEST,
  };
};
export const fetchGetTokenSuccess = (data) => {
  return {
    type: userConstants.FETCH_TOKEN_SUCCESS,
    payload: data.token,
  };
};
export const fetchGetTokenFailure = (error) => {
  return {
    type: userConstants.FETCH_TOKEN_FAILURE,
    payload: error,
  };
};

export const fetchConfirmEmailRequest = () => {
  return {
    type: userConstants.FETCH_CONFIRM_REQUEST,
  };
};
export const fetchConfirmEmailSuccess = (data) => {
  return {
    type: userConstants.FETCH_CONFIRM_SUCCESS,
    payload: data,
  };
};
export const fetchConfirmEmailFailure = (error) => {
  return {
    type: userConstants.FETCH_CONFIRM_FAILURE,
    payload: error,
  };
};

export const fetchResendEmailRequest = () => {
  return {
    type: userConstants.FETCH_RESEND_REQUEST,
  };
};
export const fetchResendEmailSuccess = (data) => {
  return {
    type: userConstants.FETCH_RESEND_SUCCESS,
    payload: data,
  };
};
export const fetchResendEmailFailure = (error) => {
  return {
    type: userConstants.FETCH_RESEND_FAILURE,
    payload: error,
  };
};

export const fetchSignInRequest = () => {
  return {
    type: userConstants.FETCH_SIGNIN_REQUEST,
  };
};
export const fetchSignInSuccess = (data) => {
  return {
    type: userConstants.FETCH_SIGNIN_SUCCESS,
    payload: data,
  };
};
export const fetchSignInFailure = (error) => {
  return {
    type: userConstants.FETCH_SIGNIN_FAILURE,
    payload: error,
  };
};

export const fetchCheckAuthRequest = () => {
  return {
    type:userConstants.FETCH_AUTH_REQUEST,
  };
};
export const fetchCheckAuthSuccess = (data) => {
  return {
    type: userConstants.FETCH_AUTH_SUCCESS,
    payload: data,
  };
};
export const fetchCheckAuthFailure = (error) => {
  return {
    type: userConstants.FETCH_AUTH_FAILURE,
    payload: error,
  };
};

export const fetchForgotPassRequest = () => {
  return {
    type: userConstants.FETCH_FORGOT_REQUEST,
  };
};
export const fetchForgotPassSuccess = (data) => {
  return {
    type: userConstants.FETCH_FORGOT_SUCCESS,
    payload: data,
  };
};
export const fetchForgotPassFailure = (error) => {
  return {
    type: userConstants.FETCH_FORGOT_FAILURE,
    payload: error,
  };
};

export const fetchResetPassRequest = () => {
  return {
    type: userConstants.FETCH_RESET_REQUEST,
  };
};
export const fetchResetPassSuccess = (data) => {
  return {
    type: userConstants.FETCH_RESET_SUCCESS,
    payload: data,
  };
};
export const fetchResetPassFailure = (error) => {
  return {
    type: userConstants.FETCH_RESET_FAILURE,
    payload: error,
  };
};

export const fetchDeleteGGRequest = () => {
  return {
    type: userConstants.FETCH_DELETEGG_REQUEST,
  };
};
export const fetchDeleteGGSuccess = (data) => {
  return {
    type: userConstants.FETCH_DELETEGG_SUCCESS,
    payload: data,
  };
};
export const fetchDeleteGGFailure = (error) => {
  return {
    type: userConstants.FETCH_DELETEGG_FAILURE,
    payload: error,
  };
};

export const fetchDeleteFBRequest = () => {
  return {
    type: userConstants.FETCH_DELETEFB_REQUEST,
  };
};
export const fetchDeleteFBSuccess = (data) => {
  return {
    type: userConstants.FETCH_DELETEFB_SUCCESS,
    payload: data,
  };
};
export const fetchDeleteFBFailure = (error) => {
  return {
    type: userConstants.FETCH_DELETEFB_FAILURE,
    payload: error,
  };
};

export const fetchDeleteACRequest = () => {
  return {
    type: userConstants.FETCH_DELETEAC_REQUEST,
  };
};
export const fetchDeleteACSuccess = (data) => {
  return {
    type: userConstants.FETCH_DELETEAC_SUCCESS,
    payload: data,
  };
};
export const fetchDeleteACFailure = (error) => {
  return {
    type: userConstants.FETCH_DELETEAC_FAILURE,
    payload: error,
  };
};