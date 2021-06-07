import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";

import "./SignUp.scss";
import signupImg from "../../../../assets/images/auth/signupImg.svg";
import {
  fetchNumberOfMembers,
  fetchSignUp,
} from "../../../../redux/actions/user.action";
import InputAuth from "../../../common/InputAuth/InputAuth";
import useInputAuth from "../../../../hook/useInputAuth";
import { formatNumber } from "../../../../utils/helper/regex";

function SignUp({
  numberOfMembers,
  fetchNumberOfMembers,
  signup,
  fetchSignUp,
}) {
  const initial = {
    name: "",
    email: "",
    password: "",
    repassword: "",
  };

  const input = useInputAuth({ initial, fetchData: (data) => fetchSignUp(data) });

  useEffect(() => {
    
    notify();
    // eslint-disable-next-line
  }, [signup]);

  useEffect(() => {
    fetchNumberOfMembers();
     // eslint-disable-next-line
  }, [])

  const notify = () => {
    if (signup.error) {
      toast.error(signup.error.msg);
      toast.clearWaitingQueue();
    }
  };

  return (
    <div className="container-signup">
      <ToastContainer autoClose={3000} limit={1} transition={Zoom} />
      <div className="right">
        <img src={signupImg} alt="" />
      </div>
      <div className="left">
        <div className="left__wrap">
          <div className="signup">
            <div className="signup__title">
              <h2 className="signup__title--main">Let's Get Started!</h2>
              <p className="signup__title--sub">
                DevConnector is a community of{" "}
                {numberOfMembers.loading
                  ? null
                  : formatNumber(numberOfMembers.data)}
                ,000 amazing developers
              </p>
            </div>
            <form
              className="signup__form"
              onSubmit={input.onSubmit}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            >
              <InputAuth
                name="name"
                placeholder="Full Name"
                type="text"
                component={PersonOutlineOutlinedIcon}
                {...input}
              />

              <InputAuth
                name="email"
                placeholder="Email"
                type="text"
                component={EmailOutlinedIcon}
                {...input}
              />

              <InputAuth
                name="password"
                placeholder="Password"
                type="password"
                component={LockOpenOutlinedIcon}
                {...input}
              />

              <InputAuth
                name="repassword"
                placeholder="Confirm Password"
                type="password"
                component={LockOpenOutlinedIcon}
                {...input}
              />

              <input
                value="Sign up"
                type="submit"
                className="signup__form--submit"
              />
            </form>
          </div>
          <div className="signup__another">
            <p>
              Already have an account?{" "}
              <span>
                <Link to="/auth/signin">Sign in</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    numberOfMembers: state.user.numberOfMembers,
    signup: state.user.signup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNumberOfMembers: () => dispatch(fetchNumberOfMembers()),
    fetchSignUp: (data) => dispatch(fetchSignUp(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
