import {
  profileConstants
} from "../constants/profile.constants";

const initialObj = {
  loading: false,
  data: null,
  error: null,
};

const initialState = {
  full: initialObj,
  author: initialObj,
  set: initialObj,
  repo: initialObj,
  select: initialObj,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case profileConstants.FETCH_FULL_REQUEST:
      return {
        ...state,
        full: {
          ...initialObj,
          loading: true,
        },
      };
    case profileConstants.FETCH_FULL_SUCCESS:
      return {
        ...state,
        full: {
          ...initialObj,
          data: action.payload,
        },
      };
    case profileConstants.FETCH_FULL_FAILURE:
      return {
        ...state,
        full: {
          ...initialObj,
          error: action.payload,
        },
      };

    case profileConstants.FETCH_AUTHOR_REQUEST:
      return {
        ...state,
        author: {
          ...initialObj,
          loading: true,
        },
      };
    case profileConstants.FETCH_AUTHOR_SUCCESS:
      return {
        ...state,
        author: {
          ...initialObj,
          data: action.payload,
        },
      };
    case profileConstants.FETCH_AUTHOR_FAILURE:
      return {
        ...state,
        author: {
          ...initialObj,
          error: action.payload,
        },
      };

    case profileConstants.FETCH_SET_REQUEST:
      return {
        ...state,
        set: {
          ...initialObj,
          loading: true,
        },
      };
    case profileConstants.FETCH_SET_SUCCESS:
      return {
        ...state,
        set: {
          ...initialObj,
          data: action.payload,
        },
      };
    case profileConstants.FETCH_SET_FAILURE:
      return {
        ...state,
        set: {
          ...initialObj,
          error: action.payload,
        },
      };

    case profileConstants.FETCH_REPO_REQUEST:
      return {
        ...state,
        repo: {
          ...initialObj,
          loading: true,
        },
      };
    case profileConstants.FETCH_REPO_SUCCESS:
      return {
        ...state,
        repo: {
          ...initialObj,
          data: action.payload,
        },
      };
    case profileConstants.FETCH_REPO_FAILURE:
      return {
        ...state,
        repo: {
          ...initialObj,
          error: action.payload,
        },
      };

    case profileConstants.FETCH_SELECT_REQUEST:
      return {
        ...state,
        select: {
          ...initialObj,
          loading: true,
        },
      };
    case profileConstants.FETCH_SELECT_SUCCESS:
      return {
        ...state,
        select: {
          ...initialObj,
          data: action.payload,
        },
      };
    case profileConstants.FETCH_SELECT_FAILURE:
      return {
        ...state,
        select: {
          ...initialObj,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default profileReducer;
