import axios from "axios";
import {
  fetchFullInfoRequest,
  fetchFullInfoSuccess,
  fetchFullInfoFailure,
  fetchAuthorRouteFailure,
  fetchAuthorRouteSuccess,
  fetchAuthorRouteRequest,
  fetchSetInfoRequest,
  fetchSetInfoSuccess,
  fetchSetInfoFailure,
  fetchGetRepoRequest,
  fetchGetRepoSuccess,
  fetchGetRepoFailure,
  fetchSelectRepoRequest,
  fetchSelectRepoSuccess,
  fetchSelectRepoFailure,
} from "../types/index.profile.action";

export const fetchPostFullInfo = (data) => (dispatch) => {
  dispatch(fetchFullInfoRequest());
  axios
    .post("/api/profile/full-info", data)
    .then((res) => dispatch(fetchFullInfoSuccess(res.data)))
    .catch((err) => dispatch(fetchFullInfoFailure(err.response.data)));
};

export const fetchAuthorRoute = (data) => (dispatch) => {
  dispatch(fetchAuthorRouteRequest());
  axios
    .post("/api/profile/author-route", data)
    .then((res) => dispatch(fetchAuthorRouteSuccess(res.data)))
    .catch((err) => dispatch(fetchAuthorRouteFailure(err.response.data)));
};

export const fetchGetFullInfo = () => (dispatch) => {
  dispatch(fetchFullInfoRequest());
  axios
    .get("/api/profile/full-info")
    .then((res) => dispatch(fetchFullInfoSuccess(res.data)))
    .catch((err) => dispatch(fetchFullInfoFailure(err.response.data)));
};

export const fetchSetInfo = (data) => (dispatch) => {
  dispatch(fetchSetInfoRequest());
  axios
    .post("/api/profile/set-info", data)
    .then((res) => dispatch(fetchSetInfoSuccess(res.data)))
    .catch((err) => dispatch(fetchSetInfoFailure(err.response.data)));
};

export const fetchGetRepo = (data) => (dispatch) => {
  dispatch(fetchGetRepoRequest());
  axios
    .post("/api/profile/get-repo", data)
    .then((res) => dispatch(fetchGetRepoSuccess(res.data)))
    .catch((err) => dispatch(fetchGetRepoFailure(err.response.data)));
};

export const fetchSelectRepo = (data) => (dispatch) => {
  dispatch(fetchSelectRepoRequest());
  axios
    .post("/api/profile/select-repo", data)
    .then((res) => dispatch(fetchSelectRepoSuccess(res.data)))
    .catch((err) => dispatch(fetchSelectRepoFailure(err.response.data)));
};
