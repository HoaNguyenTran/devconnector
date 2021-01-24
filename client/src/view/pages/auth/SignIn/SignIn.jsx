import React, { useState } from "react";
import signinImg from "../../../../assets/images/signinImg.svg";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";

import "./SignIn.scss";
import { Link } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";

export default function SignIn() {
  const [visionPass, setVisionPass] = useState("password");

  return (
    <div className="container-signin">
      <NavBar acc="signup" />
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
            <form action="" className="signin__form">
              <div className="signin__form--input signin__form--email">
                <EmailOutlinedIcon className="signin__form--icon" />
                <input type="text" placeholder="Email" />
              </div>
              <div className="signin__form--error"></div>

              <div className="signin__form--input signin__form--password">
                <LockOpenOutlinedIcon className="signin__form--icon" />
                <input type={visionPass} placeholder="Password" />
                {visionPass === "password" ? (
                  <div className="eye">
                    <VisibilityOffOutlinedIcon
                      className="signin__form--icon"
                      onClick={() => setVisionPass("text")}
                    />
                  </div>
                ) : (
                  <div className="eye">
                    <VisibilityOutlinedIcon
                      className="signin__form--icon"
                      onClick={() => setVisionPass("password")}
                    />
                  </div>
                )}
              </div>
              <div className="signin__form--error">Invalid email</div>
              <div className="signin__form--option">
                <label className="checkbox path">
                  <input type="checkbox" />
                  <svg viewBox="0 0 21 21">
                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                  </svg>
                  <span>Remember me?</span>
                </label>
                <Link className="signin__form--forgot" to="/">
                  Forgot Password?
                </Link>
              </div>
              <input
                type="submit"
                value="Sign in"
                className="signin__form--submit"
              />
            </form>
          </div>
          <div className="social-signin">
            <p className="social-signin__title">
              <span>Or connect using</span>
            </p>
            <div className="social-signin__network">
              <Link to="/">
                <i className="fab fa-facebook-f"></i>
                <span>Facebook</span>
              </Link>
              <Link to="/">
                <i className="fab fa-google"></i>
                <span>Google</span>
              </Link>
            </div>
            <div className="social-signin__another">
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
