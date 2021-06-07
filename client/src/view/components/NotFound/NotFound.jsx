import React from "react";
import { Link } from "react-router-dom";

import "./NotFound.scss";
import notfound from "../../../assets/images/auth/notfound.jpg";
import Footer from "../Footer/Footer";

export default function NotFound() {
  return (
    <div>
      <div className="notfound">
        <div className="notfound__img">
          <img src={notfound} alt="" />
        </div>
        <div className="notfound__content">
          <p>This page does not exist</p>
          <Link to="/">Return to Home Page</Link>{" "}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
