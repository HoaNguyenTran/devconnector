import axios from "axios";
import {
  fetchNumOfMemFailure,
  fetchNumOfMemResquest,
  fetchNumOfMemSuccess,

  fetchSignUpFailure,
  fetchSignupResquest,
  fetchSignUpSuccess,
} from "./index.action";

export const fetchNumberOfMembers = () => {
  return (dispatch) => {
    dispatch(fetchNumOfMemResquest());
    axios
      .get(`http://localhost:5000/api/users/number_of_members`)
      .then((responsive) => {
        dispatch(fetchNumOfMemSuccess(responsive.data));
      })
      .catch((error) => {
        dispatch(fetchNumOfMemFailure(error.message));
      });
  };
};

export const fetchSignUp = (data) => {
  console.log(data);
  
  return (dispatch) => {
    dispatch(fetchSignupResquest());
    axios
      .post(`http://localhost:5000/api/users/signup`, data)
      .then((responsive) => {
        dispatch(fetchSignUpSuccess(responsive.data));
      })
      .catch((error) => {
        dispatch(fetchSignUpFailure(error.message));
      });
  };
};
