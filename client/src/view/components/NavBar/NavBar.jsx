import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Divider,
  InputBase,
  SwipeableDrawer,
  Toolbar,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

import "./NavBar.scss";
import Banner from "../Banner/Banner";

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 300,
    height: "100%",
    overflowX: "auto",
    position: "relative",
  },

  toolBarPC: {
    paddingLeft: "10vw",
    paddingRight: "10vw",
  },

  inputBar: {
    border: "1px solid #aaa",
    borderRadius: "4px",
    width: "380px",
    padding: "4px",
  },

  authIcon: {
    fontSize: 30,
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(2),
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [auth, setAuth] = useState(false);
  const [drawer, setDrawer] = useState(false);

  const toolBar = `toolBar ${matches && classes.toolBarPC}`;

  const account = () => {
    switch (props.acc) {
      case "signin":
        return (
          <Link to="/auth/signin">
            <button>Sign in</button>
          </Link>
        );
        case "signup":
          return (
            <Link to="/auth/signup">
              <button>Sign up</button>
            </Link>
          );
      default:
        return (
          <Link to="/auth/signin">
            <button>Sign in</button>
          </Link>
        );
    }
  };

  useEffect(() => {
    const resizeListener = () => {
      setDrawer(false);
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return (
    <AppBar position="fixed" color="default">
      <Toolbar disableGutters={true} className={toolBar}>
        <SwipeableDrawer
          open={drawer}
          onClose={() => setDrawer(false)}
          onOpen={() => setDrawer(true)}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <h1 className="header__hamburger--title">DevConnector</h1>
          <CloseRoundedIcon
            className="header__hamburger--close"
            onClick={() => setDrawer(false)}
          />
          <Divider />

          <Banner />
        </SwipeableDrawer>
        {!matches && (
          <button
            className="header__hamburger"
            onClick={() => setDrawer(!drawer)}
          >
            <MenuRoundedIcon fontSize="large" className={classes.menuIcon} />
          </button>
        )}
        <Link to="/">
          <span className="header__logo">
            <i className="fab fa-dev fa-3x"></i>
          </span>
        </Link>

        {matches ? (
          <div className="header__searchBar">
            <InputBase placeholder="Search..." className={classes.inputBar} />
          </div>
        ) : (
          <div className="header__searchIcon">
            <SearchOutlinedIcon style={{ fontSize: 30 }} />
          </div>
        )}

        {auth ? (
          <div>
            <MailOutlineOutlinedIcon className={classes.authIcon} />
            <NotificationsOutlinedIcon className={classes.authIcon} />
            <AccountCircleOutlinedIcon className={classes.authIcon} />
          </div>
        ) : (
          <div className="header__btn">{ account() }</div>
        )}
      </Toolbar>
    </AppBar>
  );
}
