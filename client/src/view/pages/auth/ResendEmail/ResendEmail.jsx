import { Card, Divider } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { fetchResendEmail } from "../../../../redux/actions/user.action";
import "./ResendEmail.scss";

function ResendEmail({ resendEmail, fetchResendEmail }) {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [wait, setWait] = useState(false);

  useEffect(() => {
    fetchResendEmail(id);
    const time300 = setTimeout(() => {
        if(resendEmail.data) {
            setShow(true);
        }

    }, 300)

    const time500 = setTimeout(()=> {
        setWait(true);
    }, 500);

    return () => {
        clearTimeout(time300);
        clearTimeout(time500);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {!wait ? null : !show? <div>404</div> : (
        <div className="resendEmail">
          <div className="resendEmail__main">
            <Card className="resendEmail__card">
              <h1 className="resendEmail__card--title">Check your inbox</h1>
              <Divider />
              <p className="resendEmail__card--register">
                Registration email sent to:{" "}
                <span>{sessionStorage.getItem("email")}</span>
                {". "}
              </p>
              <p>Open this email to finish sign up.</p>
              <p>
                If you don's see this email in your inbox, look for it in your
                sunk mail folder. The link will exprise in 15 minutes.
              </p>
              <p>
                Please click resend the email verification link in{" "}
                <Link to={`/auth/resend-email/${id}`}>here</Link>.
              </p>{" "}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    resendEmail: state.user.resend,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchResendEmail: (id) => dispatch(fetchResendEmail(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResendEmail);
