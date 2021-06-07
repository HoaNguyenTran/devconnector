import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route } from "react-router-dom";

import history from "./utils/helper/history";

import ProtectedRoute from "./view/common/ProtectedRoute/ProtectedRoute";
import NavBar from "./view/components/NavBar/NavBar";
import NotFound from "./view/components/NotFound/NotFound";
import SignIn from "./view/pages/auth/SignIn/SignIn";
import SignUp from "./view/pages/auth/SignUp/SignUp";
import ConfirmEmail from "./view/pages/auth/ConfirmEmail/ConfirmEmail";
import GetToken from "./view/pages/auth/GetToken/GetToken";
import ResendEmail from "./view/pages/auth/ResendEmail/ResendEmail";
import ForgotPassword from "./view/pages/auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./view/pages/auth/ResetPassword/ResetPassword";
import SignOut from "./view/pages/auth/SignOut/SignOut";
import Cookies from "js-cookie";
import { fetchCheckAuth } from "./redux/actions/user.action";
import { fetchGetFullInfo } from "./redux/actions/profile.action";
import Profile from "./view/pages/profile/Profile/Profile";
import Settings from "./view/pages/profile/Settings/Settings";
import { Edit } from "./view/common/Edit/Edit";
import { New } from "./view/pages/feature/New/New";
import { Tags } from "./view/pages/feature/Tags/Tags";
import Post from "./view/pages/feature/Post/Post";
import { Presentation } from "./view/pages/article/Presentation/Presentation";

const accessToken = Cookies.get("access_token");

const App = () => {
  const { set } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const fetchAuth = () => dispatch(fetchCheckAuth());
  const fetchFull = () => dispatch(fetchGetFullInfo());

  useEffect(() => {
    if (accessToken) {
      fetchFull();
      fetchAuth();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (set.data) fetchFull();
    // eslint-disable-next-line
  }, [set.data]);

  return (
    <Router history={history}>
      <NavBar />
      <div style={{ marginTop: "5rem" }}>
        <Switch>
     
          <Route exact path="/auth/signin">
            <SignIn />
          </Route>
          <Route exact path="/auth/signup">
            <SignUp />
          </Route>
          <Route exact path="/auth/get-token/:id/:token">
            <GetToken />
          </Route>
          <Route path="/auth/confirm-email/:id/:token">
            <ConfirmEmail />
          </Route>
          <Route path="/auth/resend-email/:id">
            <ResendEmail />
          </Route>
          <Route path="/auth/forgot-password">
            <ForgotPassword />
          </Route>
          <Route path="/auth/reset-password/:id/:token">
            <ResetPassword />
          </Route>
          <Route exact path="/tags">
            <Tags />
          </Route>
          <Route exact path="/tag/:idTag">
            <Tags />
          </Route>

          <ProtectedRoute path="/auth/signout" component={SignOut} />
          <ProtectedRoute path="/settings" component={Settings} />
          <ProtectedRoute path="/new" component={New} />
          <ProtectedRoute path="/edit" component={Edit} />

          <Route exact path="/:username">
            <Profile />
          </Route>
          <Route exact path="/:username/:slug" component={Post}>
            <Post />
          </Route>
          <Route exact path="/">
            <Presentation />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
