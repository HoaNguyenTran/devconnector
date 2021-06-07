import React from "react";
import { connect } from "react-redux";
import { Route, useHistory } from "react-router-dom";

import DialogCommon from "../Dialog/DialogCommon";
import useDialog from "../../../hook/useDialog";
import "./ProtectedRoute.scss"

function ProtectedRoute({
  checkAuth,
  component: Component,
  ...rest
}) {
  const [isShowing, toggle] = useDialog();
  const history = useHistory();
  let renderContainer = null;

    renderContainer = (
      <Route
        {...rest}
        render={(props) => {
          if (checkAuth.data || checkAuth.loading) {
            return <Component />;
          } else {
            return (
              <div className="protected">
                <div className="protected__back">
                  <button onClick={() => history.goBack()}>
                    {" "} Go back
                  </button>
                </div>
                <DialogCommon
                  isShowing={!isShowing}
                  hide={toggle}
                  {...props}
                />
              </div>
            );
          }
        }}
      />
    );

  return renderContainer;
}

const mapStateToProps = (state) => {
  return {
    checkAuth: state.user.auth,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
