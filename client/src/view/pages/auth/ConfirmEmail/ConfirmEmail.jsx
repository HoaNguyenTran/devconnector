import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchToken } from "../../../../redux/actions/user.action";
import NavBar from "../../../components/NavBar/NavBar";

function ConfirmEmail({ verifyToken, fetchToken }) {
  const [show, setShow] = useState(false);
  const [temp, setTemp] = useState(0);

  const { token } = useParams();

  useEffect(() => {
    fetchToken();

    const timer = setTimeout(() => {
      if (verifyToken.data) {
        setTemp(verifyToken.data.verify_token);
        if (temp === token) setShow(true);
      } else {
          setTemp(1);
          setShow(false);
    }
    //   console.log(temp);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, [temp]);

  return (
    <div>
      {show ? <NavBar /> : <div>404</div>}
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
    fetchToken: () => dispatch(fetchToken()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmail);
