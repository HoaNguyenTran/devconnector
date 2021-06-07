import React, { useEffect } from "react";
import { Card } from "@material-ui/core";
import "./ForgotPassword.scss";
import { fetchForgotPass } from "../../../../redux/actions/user.action";
import { connect } from "react-redux";
import { toast, ToastContainer, Zoom } from "react-toastify";
import InputAuth from "../../../common/InputAuth/InputAuth";
import useInputAuth from "../../../../hook/useInputAuth";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";

function ForgotPassword({ forgotPass, fetchForgotPass }) {
  const initial = {
    email: "",
  };

  const input = useInputAuth({
    initial,
    fetchData: (data) => fetchForgotPass(data),
  });

  useEffect(() => {
    if (forgotPass.error) {
      toast.error(forgotPass.error.msg);
      toast.clearWaitingQueue();
    }
    if (forgotPass.data) {
      toast.success(`Please check your email ${input.email}`);
      toast.clearWaitingQueue();
    }
    // eslint-disable-next-line
  }, [forgotPass]);

  return (
    <div className="fgpw">
      <ToastContainer autoClose={3000} limit={1} transition={Zoom} />
      <Card className="fgpw__card">
        <form className="fgpw__card--form" onSubmit={input.onSubmit}>
          <h2 className="fgpw__card--title">Forgot your password</h2>
          <InputAuth
            autoFocus
            label="Email"
            name="email"
            type="text"
            component={LockOpenOutlinedIcon}
            {...input}
          />
          <div className="fgpw__card--submit">
            <input type="submit" value="Send me reset password" />
          </div>
        </form>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    forgotPass: state.user.forgot,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchForgotPass: (data) => dispatch(fetchForgotPass(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
