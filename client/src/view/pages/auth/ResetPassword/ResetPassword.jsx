import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Card } from "@material-ui/core";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import { ToastContainer, Zoom } from "react-toastify";

import "./ResetPassword.scss";
import { fetchResetPass } from "../../../../redux/actions/user.action";
import InputAuth from "../../../common/InputAuth/InputAuth";
import useInputAuth from "../../../../hook/useInputAuth";

function ResetPassword({ resetPass, fetchResetPass }) {
  const initial = { password: "", repassword: "" };
  const { id, token } = useParams();

  const input = useInputAuth({
    initial,
    fetchData: (data) => fetchResetPass({...data, id, token}),
  });

  return (
    <div>
      <ToastContainer autoClose={3000} limit={1} transition={Zoom} />
      <Card className="rspw__card">
        <form className="rspw__card--form" onSubmit={input.onSubmit}>
          <h2 className="rspw__card--title">Change your password</h2>

          <InputAuth
            autoFocus
            label="Password"
            name="password"
            type="password"
            component={LockOpenOutlinedIcon}
            {...input}
          />

          <InputAuth
            label="Confirm Password"
            name="repassword"
            type="password"
            component={LockOpenOutlinedIcon}
            {...input}
          />
          <div className="rspw__card--submit">
            <input type="submit" value="Change my password" />
          </div>
        </form>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    resetPass: state.user.reset,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchResetPass: (data) => dispatch(fetchResetPass(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
