import {
  userConstants
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
  confirm: initialObj,
  resend: initialObj,
  signin: initialObj,
  forgot: initialObj,
  reset: initialObj,
  auth: initialObj,
  delfb: initialObj,
  delgg: initialObj,
  delac: initialObj,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.FETCH_NUMOFMEM_REQUEST:
      return {
        ...state,
        numberOfMembers: {
          ...initialObj,
          loading: true,
        },
      };
    case userConstants.FETCH_NUMOFMEM_SUCCESS:
      return {
        ...state,
        numberOfMembers: {
          ...initialObj,
          data: action.payload,
        },
      };
    case userConstants.FETCH_NUMOFMEM_FAILURE:
      return {
        ...state,
        numberOfMembers: {
          ...initialObj,
          error: action.payload,
        },
      };

    case userConstants.FETCH_SIGNUP_REQUEST:
      return {
        ...state,
        signup: {
          ...initialObj,
          loading: true,
        },
      };
    case userConstants.FETCH_SIGNUP_SUCCESS:
      return {
        ...state,
        signup: {
          ...initialObj,
          data: action.payload,
        },
      };
    case userConstants.FETCH_SIGNUP_FAILURE:
      return {
        ...state,
        signup: {
          ...initialObj,
          error: action.payload,
        },
      };

    case userConstants.FETCH_TOKEN_REQUEST:
      return {
        ...state,
        token: {
          ...initialObj,
          loading: true,
        },
      };
    case userConstants.FETCH_TOKEN_SUCCESS:
      return {
        ...state,
        token: {
          ...initialObj,
          data: action.payload,
        },
      };
    case userConstants.FETCH_TOKEN_FAILURE:
      return {
        ...state,
        token: {
          ...initialObj,
          error: action.payload,
        },
      };

    case userConstants.FETCH_CONFIRM_REQUEST:
      return {
        ...state,
        confirm: {
          ...initialObj,
          loading: true,
        },
      };
    case userConstants.FETCH_CONFIRM_SUCCESS:
      return {
        ...state,
        confirm: {
          ...initialObj,
          data: action.payload,
        },
      };
    case userConstants.FETCH_CONFIRM_FAILURE:
      return {
        ...state,
        confirm: {
          ...initialObj,
          error: action.payload,
        },
      };

    case userConstants.FETCH_RESEND_REQUEST:
      return {
        ...state,
        resend: {
          ...initialObj,
          loading: true,
        },
      };
    case userConstants.FETCH_RESEND_SUCCESS:
      return {
        ...state,
        resend: {
          ...initialObj,
          data: action.payload,
        },
      };
    case userConstants.FETCH_RESEND_FAILURE:
      return {
        ...state,
        resend: {
          ...initialObj,
          error: action.payload,
        },
      };

    case userConstants.FETCH_SIGNIN_REQUEST:
      return {
        ...state,
        signin: {
          ...initialObj,
          loading: true,
        },
      };
    case userConstants.FETCH_SIGNIN_SUCCESS:
      return {
        ...state,
        signin: {
          ...initialObj,
          data: action.payload,
        },
      };
    case userConstants.FETCH_SIGNIN_FAILURE:
      return {
        ...state,
        signin: {
          ...initialObj,
          error: action.payload,
        },
      };

    case userConstants.FETCH_AUTH_REQUEST:
      return {
        ...state,
        auth: {
          ...initialObj,
          loading: true,
        },
      };
    case userConstants.FETCH_AUTH_SUCCESS:
      return {
        ...state,
        auth: {
          ...initialObj,
          data: action.payload,
        },
      };
    case userConstants.FETCH_AUTH_FAILURE:
      return {
        ...state,
        auth: {
          ...initialObj,
          error: action.payload,
        },
      };

    case userConstants.FETCH_FORGOT_REQUEST:
      return {
        ...state,
        forgot: {
          ...initialObj,
          loading: true,
        },
      };
    case userConstants.FETCH_FORGOT_SUCCESS:
      return {
        ...state,
        forgot: {
          ...initialObj,
          data: action.payload,
        },
      };
    case userConstants.FETCH_FORGOT_FAILURE:
      return {
        ...state,
        forgot: {
          ...initialObj,
          error: action.payload,
        },
      };

    case userConstants.FETCH_RESET_REQUEST:
      return {
        ...state,
        reset: {
          ...initialObj,
          loading: true,
        },
      };
    case userConstants.FETCH_RESET_SUCCESS:
      return {
        ...state,
        reset: {
          ...initialObj,
          data: action.payload,
        },
      };
    case userConstants.FETCH_RESET_FAILURE:
      return {
        ...state,
        reset: {
          ...initialObj,
          error: action.payload,
        },
      };

    case userConstants.FETCH_DELETEGG_REQUEST:
      return {
        ...state,
        delgg: {
          ...initialObj,
          loading: true,
        },
      };
    case userConstants.FETCH_DELETEGG_SUCCESS:
      return {
        ...state,
        delgg: {
          ...initialObj,
          data: action.payload,
        },
      };
    case userConstants.FETCH_DELETEGG_FAILURE:
      return {
        ...state,
        delgg: {
          ...initialObj,
          error: action.payload,
        },
      };

    case userConstants.FETCH_DELETEFB_REQUEST:
      return {
        ...state,
        delfb: {
          ...initialObj,
          loading: true,
        },
      };
    case userConstants.FETCH_DELETEFB_SUCCESS:
      return {
        ...state,
        delfb: {
          ...initialObj,
          data: action.payload,
        },
      };
    case userConstants.FETCH_DELETEFB_FAILURE:
      return {
        ...state,
        delfb: {
          ...initialObj,
          error: action.payload,
        },
      };

    case userConstants.FETCH_DELETEAC_REQUEST:
      return {
        ...state,
        delac: {
          ...initialObj,
          loading: true,
        },
      };
    case userConstants.FETCH_DELETEAC_SUCCESS:
      return {
        ...state,
        delac: {
          ...initialObj,
          data: action.payload,
        },
      };
    case userConstants.FETCH_DELETEAC_FAILURE:
      return {
        ...state,
        delac: {
          ...initialObj,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
