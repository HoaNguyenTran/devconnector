import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { toast, ToastContainer, Zoom } from "react-toastify";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";

import { fetchSignIn } from "../../../../redux/actions/user.action";
import InputAuth from "../../../common/InputAuth/InputAuth";
import useInputAuth from "../../../../hook/useInputAuth";

import signinImg from "../../../../assets/images/auth/signinImg.svg";
import "./SignIn.scss";

function SignIn({ signin, fetchSignIn }) {

  const initial = {
    email: "",
    password: "",
  };

  const input = useInputAuth({ initial, fetchData: (data) => fetchSignIn(data) });

  useEffect(() => {
    notify();
    // eslint-disable-next-line
  }, [signin]);

  const notify = () => {
    if (signin.error) {
      toast.error(signin.error.msg);
      toast.clearWaitingQueue();
    }
  };

  const googleLogin = () => {
    window.location.replace("http://localhost:5000/api/users/oauth/google")
  }

  const facebookLogin = () => {
    window.location.replace("http://localhost:5000/api/users/oauth/facebook")
  }

  return (
    <div className="container-signin">
      <ToastContainer autoClose={3000} limit={1} transition={Zoom} />
      <div className="left">
        <img src={signinImg} alt="" />
      </div>
      <div className="right">
        <div className="right__wrap">
          <div className="signin">
            <div className="signin__title">
              <h2 className="signin__title--main">Welcome back!</h2>
              <p className="signin__title--sub">
                Log in to your existant account of DevConnector
              </p>
            </div>
            <form
              className="signin__form"
              onSubmit={input.onSubmit}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            >
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

              <div className="signin__form--forgot">
                <Link to="/auth/forgot-password">Forgot Password?</Link>
              </div>
              <input
                type="submit"
                value="Sign in"
                className="signin__form--submit"
              />
            </form>
          </div>
          <div className="social">
            <p className="social__title">
              <span>Or connect using</span>
            </p>
            <div className="social__network">
              <div className="social__network--facebook" onClick={facebookLogin}>
                <i className="fab fa-facebook-f"></i>
                <span>Facebook</span>
              </div>
              <div className="social__network--google" onClick={googleLogin}>
                <i className="fab fa-google"></i>
                <span>Google</span>
              </div>
            </div>
            <div className="social__another">
              <p>
                Don't have an account?{" "}
                <span>
                  <Link to="/auth/signup">Sign up</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    signin: state.user.signin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSignIn: (data) => dispatch(fetchSignIn(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
