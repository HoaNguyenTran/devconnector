import {
  FETCH_NUMOFMEM_REQUEST,
  FETCH_NUMOFMEM_SUCCESS,
  FETCH_NUMOFMEM_FAILURE,
  FETCH_SIGNUP_REQUEST,
  FETCH_SIGNUP_SUCCESS,
  FETCH_SIGNUP_FAILURE,
  FETCH_TOKEN_SUCCESS,
  FETCH_TOKEN_REQUEST,
  FETCH_TOKEN_FAILURE,
} from "../constants/user.constants";

const initialObj = {
  loading: false,
  data: null,
  error: null,
};

const initialState = {
  numberOfMembers: initialObj,
  signup: initialObj,
  token: initialObj,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NUMOFMEM_REQUEST:
      return {
        ...state,
        numberOfMembers: {
          ...initialState.numberOfMembers,
          loading: true,
        },
      };
    case FETCH_NUMOFMEM_SUCCESS:
      return {
        ...state,
        numberOfMembers: {
          ...initialState.numberOfMembers,
          data: action.payload,
        },
      };
    case FETCH_NUMOFMEM_FAILURE:
      return {
        ...state,
        numberOfMembers: {
          ...initialState.numberOfMembers,
          error: action.payload,
        },
      };


    case FETCH_SIGNUP_REQUEST:
      return {
        ...state,
        signup: {
          ...initialState.signup,
          loading: true,
        },
      };
    case FETCH_SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          ...initialState.signup,
          data: action.payload,
        },
      };
    case FETCH_SIGNUP_FAILURE:
      return {
        ...state,
        signup: {
          ...initialState.signup,
          error: action.payload,
        },
      };



    case FETCH_TOKEN_REQUEST:
      return {
        ...state,
        token: {
          ...initialState.token,
          loading: true,
        },
      };

    case FETCH_TOKEN_SUCCESS:
      return {
        ...state,
        token: {
          ...initialState.token,
          data: action.payload,
        },
      };

    case FETCH_TOKEN_FAILURE:
      return {
        ...state,
        token: {
          ...initialState.token,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
