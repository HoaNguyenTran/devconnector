
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { toast, ToastContainer, Zoom } from "react-toastify";
import { fetchConfirmEmail } from "../../../../redux/actions/user.action";

function ConfirmEmail({ confirmEmail, fetchConfirmEmail }) {
  let { id, token } = useParams();
  let history = useHistory();

  useEffect(() => {
    fetchConfirmEmail(id, token);
 
    // eslint-disable-next-line
  }, []);
 
  useEffect(() => {
    notify();
    
  })

  const notify = () => {
    if (confirmEmail.error) {
      toast.error(confirmEmail.error.msg);
      toast.clearWaitingQueue();

      setTimeout(() => history.push("/auth/signup"), 3000)
    }

    if(confirmEmail.data) {
      window.location.replace("http://localhost:3000")
    }
    
  };

  return (
    <div>
      <ToastContainer autoClose={3000} limit={1} transition={Zoom} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    confirmEmail: state.user.confirm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchConfirmEmail: (id, token) => dispatch(fetchConfirmEmail(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);
