import axios from "axios";
import history from "../../utils/helper/history";

import {
  fetchNumOfMemFailure,
  fetchNumOfMemRequest,
  fetchNumOfMemSuccess,
  fetchSignUpFailure,
  fetchSignupRequest,
  fetchSignUpSuccess,
  fetchTokenFailure,
  fetchTokenRequest,
  fetchTokenSucces,
} from "./index.action";

export const fetchNumberOfMembers = () => {
  return (dispatch) => {
    dispatch(fetchNumOfMemRequest());
    axios
      .get("/api/users/number_of_members")
      .then((responsive) => {
        dispatch(fetchNumOfMemSuccess(responsive.data));
      })
      .catch((error) => {
        dispatch(fetchNumOfMemFailure(error.message));
      });
  };
};

export const fetchSignUp = (data) => {
  return (dispatch) => {
    dispatch(fetchSignupRequest());
    axios
      .post("/api/users/signup", data)
      .then((responsive) => {
        dispatch(fetchSignUpSuccess(responsive.data));
        const { userId, verifyToken } = responsive.data;
        history.push(`/auth/confirm-email/${userId}/${verifyToken}`);
      })
      .catch((error) => {
        dispatch(fetchSignUpFailure(error.message));
      });
  };
};

export const fetchToken = () => async (dispatch) => {
  dispatch(fetchTokenRequest());
  await axios
    .get("/api/users/get-token")
    .then((responsive) => {
      dispatch(fetchTokenSucces(responsive.data));
    })
    .catch((error) => {
      dispatch(fetchTokenFailure(error.message));
    });
};
