import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import history from "./utils/helper/history"

import NavBar from "./view/components/NavBar/NavBar";
import SignIn from "./view/pages/auth/SignIn/SignIn";
import SignUp from "./view/pages/auth/SignUp/SignUp";
import ConfirmEmail from "./view/pages/auth/ConfirmEmail/ConfirmEmail";
import ProtectedRoute from "./view/components/ProtectedRoute/ProtectedRoute";


const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 768,
      lg: 1025,
      xl: 1200,
    },
  },
});
export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <NavBar />
          </Route>
          <Route exact path="/auth/signin">
            <SignIn />
          </Route>
          <Route exact path="/auth/signup">
            <SignUp />
          </Route>
          <Route path="/auth/confirm-email/:id/:token">
            <ConfirmEmail />
          </Route>
          {/* <ProtectedRoute path="/auth/confirm-email/:id/:token" component={ConfirmEmail} />  */}
          <Route>404</Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}
