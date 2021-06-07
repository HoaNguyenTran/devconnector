import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  AppBar,
  Divider,
  InputBase,
  ListItemText,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Toolbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";

import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Cookies from "js-cookie";
import "./NavBar.scss";
import Banner from "../Banner/Banner";
import logo from "../../../assets/images/auth/logo.jpg";
import { useSelector } from "react-redux";
import { withStyles } from "@material-ui/styles";

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

  authIcon: {
    fontSize: 32,
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(2),
  },
}));

const StyledMenu = withStyles({
  paper: {
    width: "250px",
    border: "2px solid #d3d4d5",
    padding: "0 4px",
  },
})((props) => (
  <Menu
    elevation={3}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    transitionDuration={3}
    {...props}
  />
));

export default function NavBar() {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);
  const [full, setFull] = useState(null);
  const fullInfo = useSelector(state => state.profile.full)
  const [anchorEl, setAnchorEl] = useState(null);
  const accessToken = Cookies.get("access_token");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (
      (!fullInfo.loading && fullInfo.data) ||
      (!fullInfo.loading && fullInfo.error)
    ) {
      setFull(fullInfo);
    }
  }, [fullInfo]);

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
      <Toolbar disableGutters={true} className="toolBar">
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
          <Banner component="NavBar" />
        </SwipeableDrawer>

        <div className="header">
          <div className="header__hamburger" onClick={() => setDrawer(!drawer)}>
            <MenuRoundedIcon fontSize="large" />
          </div>
          <Link to="/">
            <span className="header__logo">
              <img src={logo} alt="logo" />
            </span>
          </Link>
          <div className="header__searchIcon">
            <SearchOutlinedIcon style={{ fontSize: 30 }} />
          </div>
          <div className="header__searchBar">
            <InputBase
              placeholder="Search..."
              className="header__searchBar--input"
            />
          </div>
          {accessToken ? (full && full.data ? (
            <div className="header__menu">
              <button className="header__menu--new">
                <Link to="/new">Write a post</Link>
              </button>
              <MailOutlineOutlinedIcon className={classes.authIcon} />
              <NotificationsOutlinedIcon className={classes.authIcon} />
              <div className="header__menu--avatar" onClick={handleClick}>
                <img src={full.data.avatar} alt="" />
              </div>
              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <ListItemText>
                    {full.data ? (
                      <Link to={`/${full.data.username}`}>
                        <div className="header__menu--name">
                          <h3>{full.data.name}</h3>
                          <p>@{full.data.username}</p>
                        </div>
                      </Link>
                    ) : null}
                  </ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemText>
                    <Link to="/dashbroad">
                      <h4>Dashbroad</h4>
                    </Link>
                  </ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>
                    <Link to="/new">
                      <h4>Write a post</h4>
                    </Link>
                  </ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>
                    <Link to="/readinglist">
                      <h4>Reading list</h4>
                    </Link>
                  </ListItemText>
                </MenuItem>
                <MenuItem>
                  <ListItemText>
                    <Link to="/settings">
                      <h4>Settings</h4>
                    </Link>
                  </ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemText>
                    <Link to="/auth/signout">
                      <h4>Sign out</h4>
                    </Link>
                  </ListItemText>
                </MenuItem>
              </StyledMenu>
            </div>
          ):(
            <div className="header__menu">
              <Skeleton
                variant="circle"
                width={40}
                height={40}
                animation="wave"
                className="header__menu--circle"
              />
              <Skeleton
                variant="circle"
                width={40}
                height={40}
                animation="wave"
                className="header__menu--circle"
              />
              <Skeleton
                variant="circle"
                width={40}
                height={40}
                animation="wave"
              />
            </div>
          )) : (
            <div className="header__btn">
              <Link to="/auth/signin">
                <button className="header__btn--signin">Sign in</button>
              </Link>

              <Link to="/auth/signup">
                <button className="header__btn--signup">Sign up</button>
              </Link>
            </div>
          ) }
          
        </div>
      </Toolbar>
    </AppBar>
  );
}
