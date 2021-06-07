import { Card, Divider } from "@material-ui/core";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchGetToken } from "../../../../redux/actions/user.action";
import "./GetToken.scss";

function GetToken({ fetchGetToken }) {
  const { id } = useParams();

  useEffect(() => {
    fetchGetToken();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="getToken">
      <div className="getToken__main">
        <Card className="getToken__card">
          <h1 className="getToken__card--title">Check your inbox</h1>
          <Divider />
          <p className="getToken__card--register">
            Registration email sent to:{" "}
            <span>{sessionStorage.getItem("email")}</span>
            {". "}
          </p>
          <p>Open this email to finish sign up.</p>
          <p>
            If you don's see this email in your inbox, look for it in your sunk
            mail folder. The link will exprise in 15 minutes.
          </p>
          <p>
            Please click resend the email verification link in{" "}
            <Link to={`/auth/resend-email/${id}`}>here</Link>.
          </p>{" "}
        </Card>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    verifyToken: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGetToken: () => dispatch(fetchGetToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GetToken);
