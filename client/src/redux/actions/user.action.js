import axios from "axios";
import history from "../../utils/helper/history";

import {
  fetchNumOfMemFailure,
  fetchNumOfMemRequest,
  fetchNumOfMemSuccess,
  fetchSignUpFailure,
  fetchSignUpRequest,
  fetchSignUpSuccess,
  fetchGetTokenFailure,
  fetchGetTokenRequest,
  fetchGetTokenSuccess,
  fetchConfirmEmailRequest,
  fetchConfirmEmailSuccess,
  fetchConfirmEmailFailure,
  fetchSignInFailure,
  fetchSignInRequest,
  fetchSignInSuccess,
  fetchResendEmailRequest,
  fetchResendEmailSuccess,
  fetchResendEmailFailure,
  fetchCheckAuthRequest,
  fetchCheckAuthSuccess,
  fetchCheckAuthFailure,
  fetchForgotPassRequest,
  fetchForgotPassSuccess,
  fetchForgotPassFailure,
  fetchResetPassRequest,
  fetchResetPassSuccess,
  fetchResetPassFailure,
  fetchDeleteFBRequest,
  fetchDeleteFBSuccess,
  fetchDeleteFBFailure,
  fetchDeleteGGRequest,
  fetchDeleteGGSuccess,
  fetchDeleteGGFailure,
  fetchDeleteACRequest,
  fetchDeleteACSuccess,
  fetchDeleteACFailure,
} from "../types/index.user.action";

let userId = null,
  verifyToken = null;

export const fetchNumberOfMembers = () => (dispatch) => {
  dispatch(fetchNumOfMemRequest());
  axios
    .get("/api/users/number-of-members")
    .then((responsive) => {
      dispatch(fetchNumOfMemSuccess(responsive.data));
    })
    .catch((error) => {
      dispatch(fetchNumOfMemFailure(error.response.data));
    });
};

export const fetchSignUp = (data) => async (dispatch) => {
  dispatch(fetchSignUpRequest());
  await axios
    .post("/api/users/signup", data)
    .then((responsive) => {
      dispatch(fetchSignUpSuccess(responsive.data));
      userId = responsive.data.userId;
      verifyToken = responsive.data.verifyToken;
      history.push(`/auth/get-token/${userId}/${verifyToken}`);
    })
    .catch((error) => {
      dispatch(fetchSignUpFailure(error.response.data));
    });
};

export const fetchGetToken = () => (dispatch) => {
  dispatch(fetchGetTokenRequest());
  axios
    .get(`/api/users/get-token/${userId}/${verifyToken}`)
    .then((responsive) => {
      dispatch(fetchGetTokenSuccess(responsive.data));
    })
    .catch((error) => {
      dispatch(fetchGetTokenFailure(error.response.data));
    });
};

export const fetchConfirmEmail = (id, token) => (dispatch) => {
  dispatch(fetchConfirmEmailRequest());
  axios
    .get(`/api/users/confirm-email/${id}/${token}`)
    .then((responsive) => {
      dispatch(fetchConfirmEmailSuccess(responsive.data));
    })
    .catch((error) => {
      dispatch(fetchConfirmEmailFailure(error.response.data));
    });
};

export const fetchResendEmail = (id) => (dispatch) => {
  dispatch(fetchResendEmailRequest());
  axios
    .get(`/api/users/resend-email/${id}`)
    .then((responsive) => {
      dispatch(fetchResendEmailSuccess(responsive.data));
    })
    .catch((error) => {
      dispatch(fetchResendEmailFailure(error.response.data));
    });
};

export const fetchSignIn = (data) =>  (dispatch) => {
  dispatch(fetchSignInRequest());
   axios
    .post("/api/users/signin", data)
    .then((responsive) => {
      dispatch(fetchSignInSuccess(responsive.data));
      if(history.location.state) {
        history.push(`/${history.location.state.from}`)
        window.location.reload();
      }else {
        history.push("/");
        window.location.reload();
      }
    })
    .catch((error) => {
      dispatch(fetchSignInFailure(error.response.data));
    });
};

export const fetchLoginGoogle = () => dispatch => {
  axios.get("http://localhost:5000/api/users/oauth/facebook").then((responsive) => {
    dispatch(fetchCheckAuth())
  })
}

export const fetchCheckAuth = () => (dispatch) => {
  dispatch(fetchCheckAuthRequest());
  axios
    .get("/api/users/check-auth")
    .then((responsive) => {
      dispatch(fetchCheckAuthSuccess(responsive.data));
    })
    .catch((error) => {
      dispatch(fetchCheckAuthFailure(error.response.data));
    });
};

export const fetchForgotPass = (data) => (dispatch) => {
  dispatch(fetchForgotPassRequest());
  axios
    .post("/api/users/forgot-password", data)
    .then((responsive) => {
      dispatch(fetchForgotPassSuccess(responsive.data));
    })
    .catch((error) => {
      dispatch(fetchForgotPassFailure(error.response.data));
    });
};

export const fetchResetPass = (data) => (dispatch) => {
  const { id, token, password, repassword } = data;
  dispatch(fetchResetPassRequest());
  axios
    .post(`/api/users/reset-password/${id}/${token}`, { password, repassword })
    .then((responsive) => {
      dispatch(fetchResetPassSuccess(responsive.data));
    })
    .catch((error) => {
      dispatch(fetchResetPassFailure(error.response.data));
    });
};

export const fetchDeleteGG = () => (dispatch) => {
  dispatch(fetchDeleteGGRequest());
  axios
    .get("/api/users/oauth/google/unlink")
    .then((responsive) => {
      dispatch(fetchDeleteGGSuccess(responsive.data));
      window.location.reload();
    })
    .catch((error) => {
      dispatch(fetchDeleteGGFailure(error.response.data));
    });
};

export const fetchDeleteFB = () => (dispatch) => {
  dispatch(fetchDeleteFBRequest());
  axios
    .get("/api/users/oauth/facebook/unlink")
    .then((responsive) => {
      dispatch(fetchDeleteFBSuccess(responsive.data));
      window.location.reload();
    })
    .catch((error) => {
      dispatch(fetchDeleteFBFailure(error.response.data));
    });
};

export const fetchDeleteAC = () => (dispatch) => {
  dispatch(fetchDeleteACRequest());
  axios
    .delete("/api/users/remove/account")
    .then((responsive) => {
      dispatch(fetchDeleteACSuccess(responsive.data));
      history.push("/");
      window.location.reload();
    })
    .catch((error) => {
      dispatch(fetchDeleteACFailure(error.response.data));
    });
};

