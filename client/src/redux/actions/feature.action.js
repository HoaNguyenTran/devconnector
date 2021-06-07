import axios from "axios";
import history from "../../utils/helper/history";

import {
  fetchAddTagFailure,
  fetchAddTagRequest,
  fetchAddTagSuccess,
  fetchFollowTagFailure,
  fetchFollowTagRequest,
  fetchFollowTagSuccess,
  fetchFullPostFailure,
  fetchFullPostRequest,
  fetchFullPostSuccess,
  fetchGetTagFailure,
  fetchGetTagRequest,
  fetchGetTagSuccess,
  fetchSavePostFailure,
  fetchSavePostRequest,
  fetchSavePostSuccess,
  fetchSlugPostFailure,
  fetchSlugPostRequest,
  fetchSlugPostSuccess,
} from "../types/index.feature.action";

export const fetchAddTag = (data) => (dispatch) => {
  dispatch(fetchAddTagRequest());
  axios
    .post("/api/feature/add-tag", data)
    .then((res) => dispatch(fetchAddTagSuccess(res.data)))
    .catch((err) => dispatch(fetchAddTagFailure(err.response.data)));
};

export const fetchGetTag = () => (dispatch) => {
  dispatch(fetchGetTagRequest());
  axios
    .get("/api/feature/get-tag")
    .then((res) => dispatch(fetchGetTagSuccess(res.data)))
    .catch((err) => dispatch(fetchGetTagFailure(err.response.data)));
};

export const fetchFollowTag = (data) => (dispatch) => {
  dispatch(fetchFollowTagRequest());
  axios
    .post("/api/feature/follow-tag", data)
    .then((res) => dispatch(fetchFollowTagSuccess(res.data)))
    .catch((err) => dispatch(fetchFollowTagFailure(err.response.data)));
};

export const fetchSavePost = (data) => (dispatch) => {
  dispatch(fetchSavePostRequest());
  axios
    .post("/api/post/save-post", data)
    .then((res) => {
      dispatch(fetchSavePostSuccess(res.data));
      history.push(`${res.data.slug}`);
    })
    .catch((err) => dispatch(fetchSavePostFailure(err.response.data)));
};

export const fetchSlugPost = (slug) => (dispatch) => {
  dispatch(fetchSlugPostRequest());
  axios
    .get(`/api/post${slug}`)
    .then((res) => dispatch(fetchSlugPostSuccess(res.data)))
    .catch((err) => dispatch(fetchSlugPostFailure(err)));
};

export const fetchFullPost = (data) => (dispatch) => {
  dispatch(fetchFullPostRequest());
  axios
    .post("/api/post/full-post", data)
    .then((res) => dispatch(fetchFullPostSuccess(res.data)))
    .catch((err) => dispatch(fetchFullPostFailure(err)));
};
