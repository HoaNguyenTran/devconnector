import {
  FETCH_NUMOFMEM_REQUEST,
  FETCH_NUMOFMEM_SUCCESS,
  FETCH_NUMOFMEM_FAILURE,
  FETCH_SIGNUP_REQUEST,
  FETCH_SIGNUP_SUCCESS,
  FETCH_SIGNUP_FAILURE,
  FETCH_TOKEN_REQUEST,
  FETCH_TOKEN_FAILURE,
  FETCH_TOKEN_SUCCESS,
} from "../constants/user.constants";

export const fetchNumOfMemRequest = () => {
  return {
    type: FETCH_NUMOFMEM_REQUEST,
  };
};

export const fetchNumOfMemSuccess = (data) => {
  return {
    type: FETCH_NUMOFMEM_SUCCESS,
    payload: data,
  };
};

export const fetchNumOfMemFailure = (error) => {
  return {
    type: FETCH_NUMOFMEM_FAILURE,
    payload: error,
  };
};



export const fetchSignupRequest = () => {
  return {
    type: FETCH_SIGNUP_REQUEST,
  };
};

export const fetchSignUpSuccess = (data) => {
  return {
    type: FETCH_SIGNUP_SUCCESS,
    payload: data,
  };
};

export const fetchSignUpFailure = (error) => {
  return {
    type: FETCH_SIGNUP_FAILURE,
    payload: error,
  };
};



export const fetchTokenRequest = () => {
  return {
    type: FETCH_TOKEN_REQUEST,
  }
}

export const fetchTokenSucces = (data) => {
  return {
    type: FETCH_TOKEN_SUCCESS,
    payload: data.token
  }
}

export const fetchTokenFailure = (error) => {
  return {
    type: FETCH_TOKEN_FAILURE,
    payload: error
  }
}