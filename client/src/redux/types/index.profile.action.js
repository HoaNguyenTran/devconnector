import {
    profileConstants
} from "../constants/profile.constants";

export const fetchFullInfoRequest = () => {
    return {
        type: profileConstants.FETCH_FULL_REQUEST,
    }
}
export const fetchFullInfoSuccess = (data) => {
    return {
        type: profileConstants.FETCH_FULL_SUCCESS,
        payload: data
    }
}
export const fetchFullInfoFailure = (error) => {
    return {
        type: profileConstants.FETCH_FULL_FAILURE,
        payload: error
    }
}

export const fetchAuthorRouteRequest = () => {
    return {
        type: profileConstants.FETCH_AUTHOR_REQUEST,
    }
}
export const fetchAuthorRouteSuccess = (data) => {
    return {
        type: profileConstants.FETCH_AUTHOR_SUCCESS,
        payload: data
    }
}
export const fetchAuthorRouteFailure = (error) => {
    return {
        type: profileConstants.FETCH_AUTHOR_FAILURE,
        payload: error
    }
}

export const fetchSetInfoRequest = () => {
    return {
        type: profileConstants.FETCH_SET_REQUEST,
    }
}
export const fetchSetInfoSuccess = (data) => {
    return {
        type: profileConstants.FETCH_SET_SUCCESS,
        payload: data
    }
}
export const fetchSetInfoFailure = (error) => {
    return {
        type: profileConstants.FETCH_SET_FAILURE,
        payload: error
    }
}

export const fetchGetRepoRequest = () => {
    return {
        type: profileConstants.FETCH_REPO_REQUEST,
    }
}
export const fetchGetRepoSuccess = (data) => {
    return {
        type: profileConstants.FETCH_REPO_SUCCESS,
        payload: data
    }
}
export const fetchGetRepoFailure = (error) => {
    return {
        type: profileConstants.FETCH_REPO_FAILURE,
        payload: error
    }
}

export const fetchSelectRepoRequest = () => {
    return {
        type: profileConstants.FETCH_SELECT_REQUEST,
    }
}
export const fetchSelectRepoSuccess = (data) => {
    return {
        type: profileConstants.FETCH_SELECT_SUCCESS,
        payload: data
    }
}
export const fetchSelectRepoFailure = (error) => {
    return {
        type: profileConstants.FETCH_SELECT_FAILURE,
        payload: error
    }
}