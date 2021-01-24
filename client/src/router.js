import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import NavBar from './view/components/NavBar/NavBar';
import SignIn from './view/pages/auth/SignIn/SignIn';
import SignUp from './view/pages/auth/SignUp/SignUp';


const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 768,
      lg: 1025,
      xl: 1200
    }
  }
});
export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <NavBar/>
          </Route>
          <Route path="/auth/signin">
            <SignIn />
          </Route>
          <Route path="/auth/signup">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  )
}
