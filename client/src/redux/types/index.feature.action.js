import {
  featureConstants
} from "../constants/feature.constants";

export const fetchAddTagRequest = () => {
  return {
    type: featureConstants.FETCH_ADDTAG_REQUEST,
  };
};
export const fetchAddTagSuccess = (data) => {
  return {
    type: featureConstants.FETCH_ADDTAG_SUCCESS,
    payload: data,
  };
};
export const fetchAddTagFailure = (error) => {
  return {
    type: featureConstants.FETCH_ADDTAG_FAILURE,
    payload: error,
  };
};

export const fetchGetTagRequest = () => {
  return {
    type: featureConstants.FETCH_GETTAG_REQUEST,
  };
};
export const fetchGetTagSuccess = (data) => {
  return {
    type: featureConstants.FETCH_GETTAG_SUCCESS,
    payload: data,
  };
};
export const fetchGetTagFailure = (error) => {
  return {
    type: featureConstants.FETCH_GETTAG_FAILURE,
    payload: error,
  };
};

export const fetchFollowTagRequest = () => {
  return {
    type: featureConstants.FETCH_FOLLOWTAG_REQUEST,
  };
};
export const fetchFollowTagSuccess = (data) => {
  return {
    type: featureConstants.FETCH_FOLLOWTAG_SUCCESS,
    payload: data,
  };
};
export const fetchFollowTagFailure = (error) => {
  return {
    type: featureConstants.FETCH_FOLLOWTAG_FAILURE,
    payload: error,
  };
};

export const fetchSavePostRequest = () => {
  return {
    type: featureConstants.FETCH_SAVEPOST_REQUEST,
  };
};
export const fetchSavePostSuccess = (data) => {
  return {
    type: featureConstants.FETCH_SAVEPOST_SUCCESS,
    payload: data,
  };
};
export const fetchSavePostFailure = (error) => {
  return {
    type: featureConstants.FETCH_SAVEPOST_FAILURE,
    payload: error,
  };
};

export const fetchSlugPostRequest = () => {
  return {
    type: featureConstants.FETCH_SLUGPOST_REQUEST,
  };
};
export const fetchSlugPostSuccess = (data) => {
  return {
    type: featureConstants.FETCH_SLUGPOST_SUCCESS,
    payload: data,
  };
};
export const fetchSlugPostFailure = (error) => {
  return {
    type: featureConstants.FETCH_SLUGPOST_FAILURE,
    payload: error,
  };
};

export const fetchFullPostRequest = () => {
  return {
    type: featureConstants.FETCH_FULLPOST_REQUEST,
  };
};
export const fetchFullPostSuccess = (data) => {
  return {
    type: featureConstants.FETCH_FULLPOST_SUCCESS,
    payload: data,
  };
};
export const fetchFullPostFailure = (error) => {
  return {
    type: featureConstants.FETCH_FULLPOST_FAILURE,
    payload: error,
  };
};
