import axios from "axios";
import React from "react";
import "./SignOut.scss";

export default function SignOut() {
    const signout = () => {
        axios.get("/api/users/signout").then(() => {
          window.location.replace("http://localhost:3000")});
    }
  return (
    <div className="signout__container">
      <div className="signout__content">
        <h1>Are you sure you want to sign out?</h1>
        <div className="signout__content--btn">
          <button onClick={signout}>Yes, sign out</button>
        </div>
      </div>
    </div>
  );
}
