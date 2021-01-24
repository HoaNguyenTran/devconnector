import {
  FETCH_NUMOFMEM_FAILURE,
  FETCH_NUMOFMEM_REQUEST,
  FETCH_NUMOFMEM_SUCCESS,
  FETCH_SIGNUP_SUCCESS,
  FETCH_SIGNUP_FAILURE,
  FETCH_SIGNUP_REQUEST,
} from "../constants/user.constants";

const initialState = {
  numberOfMembers: {
    loading: false,
    data: [],
    error: "",
  },
  signup: {
    loading: false,
    data: [],
    error: "",
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NUMOFMEM_REQUEST:
      return {
        ...state,
        numberOfMembers: {
          ...state.numberOfMembers,
          loading: true,
        },
      };
    case FETCH_NUMOFMEM_SUCCESS:
      return {
        ...state,
        numberOfMembers: {
          ...state.numberOfMembers,
          loading: false,
          data: action.payload,
        },
      };
    case FETCH_NUMOFMEM_FAILURE:
      return {
        ...state,
        numberOfMembers: {
          ...state,
          loading: false,
          error: action.payload,
        },
      };

    case FETCH_SIGNUP_REQUEST:
      return {
        ...state,
        signup: {
          ...state.signup,
          loading: true,
        },
      };
    case FETCH_SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          ...state.signup,
          loading: false,
          data: action.payload,
        },
      };
    case FETCH_SIGNUP_FAILURE:
      return {
        ...state,
        signup: {
          ...state.signup,
          loading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
