import {
  featureConstants
} from "../constants/feature.constants";

const initialObj = {
  loading: false,
  data: null,
  error: null,
};

const initialState = {
  addTag: initialObj,
  getTag: initialObj,
  followTag: initialObj,
  savePost: initialObj,
  slugPost: initialObj,
  fullPost: initialObj,
};

const featureReducer = (state = initialState, action) => {
  switch (action.type) {
    case featureConstants.FETCH_ADDTAG_REQUEST:
      return {
        ...state,
        addTag: {
          ...initialObj,
          loading: true,
        },
      };
    case featureConstants.FETCH_ADDTAG_SUCCESS:
      return {
        ...state,
        addTag: {
          ...initialObj,
          data: action.payload,
        },
      };
    case featureConstants.FETCH_ADDTAG_FAILURE:
      return {
        ...state,
        addTag: {
          ...initialObj,
          error: action.payload,
        },
      };

    case featureConstants.FETCH_GETTAG_REQUEST:
      return {
        ...state,
        getTag: {
          ...initialObj,
          loading: true,
        },
      };
    case featureConstants.FETCH_GETTAG_SUCCESS:
      return {
        ...state,
        getTag: {
          ...initialObj,
          data: action.payload,
        },
      };
    case featureConstants.FETCH_GETTAG_FAILURE:
      return {
        ...state,
        getTag: {
          ...initialObj,
          error: action.payload,
        },
      };

    case featureConstants.FETCH_FOLLOWTAG_REQUEST:
      return {
        ...state,
        followTag: {
          ...initialObj,
          loading: true,
        },
      };
    case featureConstants.FETCH_FOLLOWTAG_SUCCESS:
      return {
        ...state,
        followTag: {
          ...initialObj,
          data: action.payload,
        },
      };
    case featureConstants.FETCH_FOLLOWTAG_FAILURE:
      return {
        ...state,
        followTag: {
          ...initialObj,
          error: action.payload,
        },
      };

    case featureConstants.FETCH_SAVEPOST_REQUEST:
      return {
        ...state,
        savePost: {
          ...initialObj,
          loading: true,
        },
      };
    case featureConstants.FETCH_SAVEPOST_SUCCESS:
      return {
        ...state,
        savePost: {
          ...initialObj,
          data: action.payload,
        },
      };
    case featureConstants.FETCH_SAVEPOST_FAILURE:
      return {
        ...state,
        savePost: {
          ...initialObj,
          error: action.payload,
        },
      };

    case featureConstants.FETCH_SLUGPOST_REQUEST:
      return {
        ...state,
        slugPost: {
          ...initialObj,
          loading: true,
        },
      };
    case featureConstants.FETCH_SLUGPOST_SUCCESS:
      return {
        ...state,
        slugPost: {
          ...initialObj,
          data: action.payload,
        },
      };
    case featureConstants.FETCH_SLUGPOST_FAILURE:
      return {
        ...state,
        slugPost: {
          ...initialObj,
          error: action.payload,
        },
      };
      

    case featureConstants.FETCH_FULLPOST_REQUEST:
      return {
        ...state,
        fullPost: {
          ...initialObj,
          loading: true,
        },
      };
    case featureConstants.FETCH_FULLPOST_SUCCESS:
      return {
        ...state,
        fullPost: {
          ...initialObj,
          data: action.payload,
        },
      };
    case featureConstants.FETCH_FULLPOST_FAILURE:
      return {
        ...state,
        fullPost: {
          ...initialObj,
          error: action.payload,
        },
      };
      
    default:
      return state;
  }
};

export default featureReducer;
