import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./ButtonCommon.scss";


export default function ButtonCommon() {
  const location = useLocation()
  
  return (
    <div className="auth">
      <button className="auth__btn auth__btn--signup">
        <Link to={{ pathname: "/auth/signup", state: {from: location.pathname}}}>Create new account</Link>
      </button>
      <button className="auth__btn auth__btn--signin">
        <Link to={{ pathname: "/auth/signin", state: {from: location.pathname}}}>Login</Link>
      </button>
    </div>
  );
}
