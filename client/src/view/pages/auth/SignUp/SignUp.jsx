import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import signupImg from "../../../../assets/images/signupImg.svg";

import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";

import "./SignUp.scss";
import NavBar from "../../../components/NavBar/NavBar";
import { formatNumber } from "../../../../utils/helper";
import {
  fetchNumberOfMembers,
  fetchSignUp,
} from "../../../../redux/actions/user.action";
import { valBlurSignup } from "../../../../utils/validation";

function SignUp({
  numberOfMembers,
  fetchNumberOfMembers,
  signup,
  fetchSignUp
}) {

  const initialRequired = {
    name: "",
    email: "",
    password: "",
    repassword: "",
  };
  const initialError = {
    name: "Name field is required",
    email: "Email field is required",
    password: "Password is field required",
    repassword: "Repeat password is field required",
  };

  const [inputs, setInputs] = useState({});
  const [vision, setVision] = useState({ password: "on", repassword: "on" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchNumberOfMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickVision = (status) => {
    setVision({ ...vision, ...status });
  };

  const onChangeInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onBlurValidate = (e) => {
    const error = valBlurSignup(e.target.name, inputs[e.target.name]);
    setErrors({ ...errors, ...error });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if(JSON.stringify(inputs) === JSON.stringify({})) {
      setErrors(initialError);
      return;
    }

    if (inputs.password !== inputs.repassword) {
      setErrors({
        ...errors,
        repassword: "Password and repeat password must match",
      });
      return;
    } else {
      setErrors({
        ...errors,
        repassword: "",
      });
    }

    if (
      JSON.stringify(errors) === JSON.stringify(initialRequired) &&
      Object.keys(inputs).length === 4
    ) {
      fetchSignUp(inputs);
      return;
    }

    return;
  };

  return (
    <div className="container-signup">
      <NavBar />
      <div className="right">
        <img src={signupImg} alt="" />
      </div>
      <div className="left">
        <div className="left__wrap">
          <div className="signup">
            <div className="signup__title">
              <h2 className="signup__title--main">Let's Get Started!</h2>
              {/* {!signup.loading && signup.error && <div>sada</div>} */}
              <p className="signup__title--sub">
                DevConnector is a community of{" "}
                {numberOfMembers.loading
                  ? ""
                  : formatNumber(numberOfMembers.data)}
                ,000 amazing developers
              </p>
            </div>
            <form
              onSubmit={onSubmit}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
              className="signup__form"
            >
              <div className="signup__form--input signup__form--name">
                <PersonOutlineOutlinedIcon className="signup__form--icon" />
                <input
                  name="name"
                  placeholder="Full Name"
                  type="text"
                  value={inputs.name || ""}
                  onChange={onChangeInput}
                  onBlur={onBlurValidate}
                />
              </div>
              <div className="signup__form--error">{errors.name}</div>

              <div className="signup__form--input signup__form--email">
                <EmailOutlinedIcon className="signup__form--icon" />
                <input
                  name="email"
                  placeholder="Email"
                  type="text"
                  value={inputs.email || ""}
                  onChange={onChangeInput}
                  onBlur={onBlurValidate}
                />
              </div>
              <div className="signup__form--error">{errors.email}</div>

              <div className="signup__form--input signup__form--password">
                <LockOpenOutlinedIcon className="signup__form--icon" />
                <input
                  name="password"
                  placeholder="Password"
                  type={vision.password === "off" ? "text" : "password"}
                  value={inputs.password || ""}
                  onChange={onChangeInput}
                  onBlur={onBlurValidate}
                />
                <div className="eye">
                  {vision.password === "on" ? (
                    <VisibilityOffOutlinedIcon
                      className="signin__form--icon"
                      onClick={() => onClickVision({ password: "off" })}
                    />
                  ) : (
                    <VisibilityOutlinedIcon
                      className="signin__form--icon"
                      onClick={() => onClickVision({ password: "on" })}
                    />
                  )}
                </div>
              </div>
              <div className="signup__form--error">{errors.password}</div>

              <div className="signup__form--input signup__form--repassword">
                <LockOpenOutlinedIcon className="signup__form--icon" />
                <input
                  name="repassword"
                  placeholder="Confirm Password"
                  type={vision.repassword === "off" ? "text" : "password"}
                  value={inputs.repassword || ""}
                  onChange={onChangeInput}
                  onBlur={onBlurValidate}
                />
                <div className="eye">
                  {vision.repassword === "on" ? (
                    <VisibilityOffOutlinedIcon
                      className="signin__form--icon"
                      onClick={() => onClickVision({ repassword: "off" })}
                    />
                  ) : (
                    <VisibilityOutlinedIcon
                      className="signin__form--icon"
                      onClick={() => onClickVision({ repassword: "on" })}
                    />
                  )}
                </div>
              </div>
              <div className="signup__form--error">{errors.repassword}</div>

              <input
                value="Sign up"
                type="submit"
                className="signup__form--submit"
              />
            </form>
          </div>
          <div className="social-signup__another">
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
