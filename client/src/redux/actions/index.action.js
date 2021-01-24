import {
  FETCH_NUMOFMEM_REQUEST,
  FETCH_NUMOFMEM_SUCCESS,
  FETCH_NUMOFMEM_FAILURE,
  FETCH_SIGNUP_REQUEST,
  FETCH_SIGNUP_SUCCESS,
  FETCH_SIGNUP_FAILURE,
} from "../constants/user.constants";

export const fetchNumOfMemResquest = () => {
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

export const fetchSignupResquest = () => {
  return {
    type: FETCH_SIGNUP_REQUEST,
  };
};

export const fetchNumOfMemFailure = (error) => {
  return {
    type: FETCH_NUMOFMEM_FAILURE,
    payload: error,
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
