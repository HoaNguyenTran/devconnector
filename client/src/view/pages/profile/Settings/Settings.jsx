import React, { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer, Zoom } from "react-toastify";
import styled from "styled-components";

import {
  fetchDeleteAC,
  fetchDeleteFB,
  fetchDeleteGG,
  fetchForgotPass,
} from "../../../../redux/actions/user.action";
import useInputEdit from "../../../../hook/useInputEdit";
import InputEdit from "../../../common/InputEdit/InputEdit";
import Spinner from "../../../components/Spinner/Spinner";
import "./Settings.scss";
import axios from "axios";
import keys from "../../../../config/keys";
import {
  fetchGetFullInfo,
  fetchGetRepo,
} from "../../../../redux/actions/profile.action";
import { SetRepo } from "../../../common/Repo/SetRepo";
import { useLocation } from "react-router";

const useStyles = makeStyles({
  card: {
    border: "1px solid #ccc",
    borderRadius: ".5rem",
  },
  save: {
    border: "1px solid #ccc",
    borderTopLeftRadius: ".5rem",
    borderTopRightRadius: ".5rem",
  },
});

const Tab = styled.div`
  background: ${(props) => (props.state === props.name ? "#fff" : "")};
  border: 1px solid
    ${(props) => (props.state === props.name ? "#fff" : "#b5bdc4")};
`;

export default function Settings() {
  const fullInfo = useSelector((state) => state.profile.full);
  const setInfo = useSelector((state) => state.profile.set);
  const forgotPass = useSelector((state) => state.user.forgot);
  const deletegg = useSelector((state) => state.user.delgg);
  const deletefb = useSelector((state) => state.user.delfb);
  const deleteac = useSelector((state) => state.user.delac);

  const select = useSelector((state) => state.profile.select);
  const repo = useSelector((state) => state.profile.repo);
  const auth = useSelector((state) => state.user.auth);

  const dispatch = useDispatch();
  const fetchForgot = (data) => dispatch(fetchForgotPass(data));
  const fetchDeleteGoogle = () => dispatch(fetchDeleteGG());
  const fetchDeleteFacebook = () => dispatch(fetchDeleteFB());
  const fetchDeleteAccount = () => dispatch(fetchDeleteAC());
  const fetchRepo = (data) => dispatch(fetchGetRepo(data));
  const fetchFull = () => dispatch(fetchGetFullInfo());

  useEffect(() => {
    if (
      (select.data && !select.loading) ||
      (setInfo.data && !setInfo.loading) ||
      (repo.data && !repo.loading) || auth.data
    )
      fetchFull();
    document.title = "Settings";
    // eslint-disable-next-line
  }, [select.data, setInfo.data, auth.data, repo.data]);

  const input = useInputEdit();
  const classes = useStyles();

  const [tab, setTab] = useState("profile");
  const onClickTab = (data) => {
    setTab(data);
  };

  const notify = () => {
    if (setInfo.error) {
      toast.error(setInfo.error.msg);
    }
    if (deletegg.error) {
      toast.error(deletegg.error.msg);
    }
    if (deletefb.error) {
      toast.error(deletefb.error.msg);
    }
    if (deleteac.error) {
      toast.error(deleteac.error.msg);
    }
    toast.clearWaitingQueue();
  };

  const googleLink = () => {
    window.location.replace(
      "http://localhost:5000/api/users/oauth/google/link"
    );
  };

  const facebookLink = () => {
    window.location.replace(
      "http://localhost:5000/api/users/oauth/facebook/link"
    );
  };

  const repoGithub = () => {
    if (input.value.github) {
      const github = input.value.github.slice(19);
      if (!github.includes("/")) {
        axios
          .get(
            `https://api.github.com/users/${github}/repos?per_page=10&sort=created:asc&client_id=${keys.CLIENT_GITHUB_ID}&client_secret=${keys.CLIENT_GITHUB_SECRET}`
          )
          .then((res) => {
            const arr = [];

            res.data.forEach((item) => {
              arr.unshift({
                id: item.id,
                name: item.name,
                des: item.description,
                language: item.language,
                url: item.html_url,
                fork: item.fork,
                status: false,
              });
            });
            fetchRepo(arr);
          })
          .catch((err) => console.log(err));
      } else toast.error("Invalid link GitHub");
    }
  };

  useEffect(() => {
    notify();
    // eslint-disable-next-line
  }, [setInfo, forgotPass, deletegg, deletefb, deleteac]);

  return fullInfo.loading ? (
    <Spinner />
  ) : input.value ? (
    <div className="settings">
      <ToastContainer autoClose={3000} limit={1} transition={Zoom} />
      <div className="settings__title">
        <h3>
          Settings for <span>@{input.obj.username}</span>
        </h3>
      </div>
      <form
        onSubmit={input.onSubmit}
        onKeyPress={(e) => {
          e.key === "Enter" && e.preventDefault();
        }}
        className="settings__content"
      >
        <div className="settings__sidebar">
          <Tab
            className="settings__sidebar--item"
            state={tab}
            name="profile"
            onClick={() => onClickTab("profile")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              role="img"
              aria-labelledby="anpgd3rqc5kccrbepzxfnklnqlia5zjt"
              className="crayons-icon crayons-icon--default"
            >
              <path
                d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"
                fill="#FFCC4D"
              ></path>
              <path
                d="M7.842 15.123c.025.1.649 2.433 4.158 2.433 3.51 0 4.133-2.333 4.158-2.433a.277.277 0 00-.464-.265c-.011.01-1.086 1.03-3.695 1.03-2.607 0-3.683-1.02-3.692-1.03a.28.28 0 00-.452.087.278.278 0 00-.014.178zM10.056 9.5c0 1.074-.622 1.944-1.39 1.944-.767 0-1.388-.87-1.388-1.944 0-1.074.621-1.944 1.389-1.944.767 0 1.389.87 1.389 1.944zm6.666 0c0 1.074-.621 1.944-1.389 1.944-.767 0-1.389-.87-1.389-1.944 0-1.074.622-1.944 1.39-1.944.767 0 1.388.87 1.388 1.944z"
                fill="#664500"
              ></path>
            </svg>
            <span> Profile</span>
          </Tab>
          <Tab
            className="settings__sidebar--item"
            state={tab}
            name="account"
            onClick={() => onClickTab("account")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              role="img"
              aria-labelledby="adfcjs2vs68w5sqaoqo0wz3rqukc3hyq"
              className="crayons-icon crayons-icon--default"
            >
              <path
                d="M14.728 9.999a9.75 9.75 0 00-1.6 1.345c-.07-2.358-.637-5.408-3.762-6.901-.618-3.364-7.83-1.655-7.183-1.329 1.285.65 1.97 2.305 2.796 3.175 1.474 1.552 3.113 1.647 3.928.433 1.927 1.252 2.054 3.627 1.995 6.166-.006.28-.013.542-.013.78v7.776c0 .614 2.223.614 2.223 0v-6.383c.3-.53 1.179-1.947 2.46-2.941.881.774 2.301.527 3.59-.83.829-.871 1.275-2.525 2.56-3.176.68-.342-7.11-2.218-6.993 1.885"
                fill="#77B255"
              ></path>
            </svg>
            <span> Account</span>
          </Tab>
          <Tab
            className="settings__sidebar--item"
            state={tab}
            name="extensions"
            onClick={() => onClickTab("extensions")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              role="img"
              aria-labelledby="aq81wh5vjyobkfazqbozx74oapxyloc5"
              className="crayons-icon crayons-icon--default"
            >
              <title id="aq81wh5vjyobkfazqbozx74oapxyloc5">Extensions</title>
              <path
                d="M7.556 22a.554.554 0 01-.494-.81l3.87-7.523h-6.71a.556.556 0 01-.363-.976L16.082 2.135a.555.555 0 01.857.675l-3.87 7.523h6.709a.556.556 0 01.363.976L7.919 21.865a.555.555 0 01-.363.135"
                fill="#FFAC33"
              ></path>
            </svg>
            <span>Extensions</span>
          </Tab>
        </div>
        {tab === "profile" && (
          <div className="settings__profile">
            <Card
              variant="outlined"
              className={`${classes.card} settings__user`}
            >
              <h3>User</h3>
              <InputEdit label="Email" name="email" disable {...input} />
              <InputEdit label="Name" name="name" {...input} />
              <InputEdit label="User Name" name="username" {...input} />
              <div>
                <div className="settings__user--name">Avatar</div>
                <div className="settings__user--content">
                  <div className="settings__user--img">
                    <img src={input.file || input.value.avatar} alt="" />
                  </div>
                  <div className="settings__user--input">
                    <input
                      type="file"
                      accept="image/*"
                      name="avatar"
                      onChange={input.onChange}
                    />
                  </div>
                </div>
              </div>
            </Card>

            <Card
              variant="outlined"
              className={`${classes.card} settings__user`}
            >
              <h3 className="settings__user--title">Basic</h3>
              <div className="settings__user--checkbox">
                <input
                  type="checkbox"
                  id="checkboxEmail"
                  checked={input.value.displayEmail || false}
                  name="displayEmail"
                  onChange={input.onChange}
                />
                <label htmlFor="checkboxEmail">Display email on profile</label>
              </div>
              <InputEdit
                label="Website URL"
                name="websiteUrl"
                placeholder="https://website.com"
                {...input}
              />
              <InputEdit
                label="Location"
                name="location"
                placeholder="Halifax, Nova Scotia"
                {...input}
              />
              <InputEdit
                label="Bio"
                name="bio"
                placeholder="A short bio..."
                textarea
                {...input}
              />
              <InputEdit label="Branding" name="color" color {...input} />
            </Card>

            <Card
              variant="outlined"
              className={`${classes.card} settings__user`}
            >
              <h3 className="settings__user--title">Coding</h3>
              <InputEdit
                label="Available for"
                name="available"
                textarea
                opinion="What kinds of collaborations or discussions are you available for? What's a good reason to say Hey! to you these days?"
                {...input}
              />
              <InputEdit
                label="Currently learning"
                name="learning"
                textarea
                opinion="What are you learning right now? What are the new tools and languages you're picking up right now?"
                {...input}
              />
              <InputEdit
                label="Skills/Languages"
                name="skills"
                textarea
                opinion="What tools and languages are you most experienced with? Are you specialized or more of a generalist?"
                {...input}
              />
              <InputEdit
                label="Currently hacking on"
                name="hacking"
                textarea
                opinion="What projects are currently occupying most of your time?"
                {...input}
              />
            </Card>

            <Card
              variant="outlined"
              className={`${classes.card} settings__user`}
            >
              <h3 className="settings__user--title">Work</h3>
              <div className="settings__user--checkbox">
                <input
                  type="checkbox"
                  id="checkboxWork"
                  name="recruiterContact"
                  onChange={input.onChange}
                  checked={input.value.recruiterContact || false}
                />
                <label htmlFor="checkboxWork">
                  Recruiters can contact me about job opportunities
                </label>
              </div>
              <InputEdit
                label="Employer title"
                name="employerTitle"
                placeholder="Junior Frontend Engineer"
                {...input}
              />
              <InputEdit
                label="Employer name"
                name="employerName"
                placeholder="Acme Inc."
                {...input}
              />
              <InputEdit label="Education" name="education" {...input} />
              <InputEdit
                label="Employer URL"
                name="employerUrl"
                placeholder="https://dev.com"
                {...input}
              />
            </Card>

            <Card
              variant="outlined"
              className={`${classes.card} settings__user`}
            >
              <h3 className="settings__user--title">Links</h3>

              <InputEdit
                label="Facebook URL"
                name="facebook"
                placeholder="https://facebook.com/..."
                {...input}
              />
              <InputEdit
                label="Twitter URL"
                name="twitter"
                placeholder="https://twitter.com/..."
                {...input}
              />
              <InputEdit
                label="Github URL"
                name="github"
                placeholder="https://github.com/..."
                {...input}
              />
              <InputEdit
                label="Instagram URL"
                name="instagram"
                placeholder="https://instagram.com/..."
                {...input}
              />
              <InputEdit
                label="LinkedIn URL"
                name="linkedin"
                placeholder="https://linkedin.com/in/..."
                {...input}
              />
            </Card>
            {input.flag && 
              <div className="settings__save">
                <Card className={`${classes.save} settings__button`}>
                  <button type="submit" value="Submit">
                    Save Profile Information
                  </button>
                </Card>
              </div>
            }
          </div>
        )}
        {tab === "account" && (
          <div className="settings__account">
            <Card
              variant="outlined"
              className={`${classes.card} settings__user`}
            >
              <h3 className="settings__user--title">Password</h3>
              <p className="settings__user--sub-title">
                If you want change password or forgot password, please click
                reset password button.
              </p>
              <button
                type="button"
                onClick={() => fetchForgot({ email: input.value.email })}
              >
                Reset password
              </button>
            </Card>
            <Card
              variant="outlined"
              className={`${classes.card} settings__user`}
            >
              <h3>Link account</h3>
              <p className="settings__user--sub-title">
                You can link account one of your authentication methods
              </p>
              <div className="settings__user--link">
                <button
                  className="settings__user--btn"
                  type="button"
                  onClick={googleLink}
                >
                  <i className="fab fa-google"></i>
                  <span>Link Google</span>
                </button>
                <button
                  className="settings__user--btn"
                  type="button"
                  onClick={facebookLink}
                >
                  <i className="fab fa-facebook-f"></i>
                  <span>Link Facebook</span>
                </button>
              </div>
            </Card>
            <Card
              variant="outlined"
              className={`${classes.card} settings__user`}
            >
              <h3>Danger Zone</h3>
              <p className="settings__user--sub-title">
                You can remove account one of your authentication methods
              </p>
              <h4 className="settings__user--sub-title">
                Remove oauth associations
              </h4>
              <div className="settings__user--delete">
                <button
                  className="settings__user--btn"
                  type="button"
                  onClick={fetchDeleteGoogle}
                >
                  <i className="fab fa-google"></i>
                  <span>Unlink Google</span>
                </button>
                <button
                  className="settings__user--btn"
                  type="button"
                  onClick={fetchDeleteFacebook}
                >
                  <i className="fab fa-facebook-f"></i>
                  <span>Unlink Facebook</span>
                </button>
              </div>
              <h4 className="settings__user--sub-title">Delete account</h4>
              <p className="settings__user--sub-title">
                Delete any and all content you have, such as articles, comments,
                your reading list or chat messages. Allow your username to
                become available to anyone.
              </p>
              <div className="settings__user--delete">
                <button
                  className="settings__user--del"
                  type="button"
                  onClick={fetchDeleteAccount}
                >
                  Delete Account
                </button>
              </div>
              <p className="settings__user--sub-title">
                Feel free to contact noreply.devnguyen@gmail.com with any
                questions.
              </p>
            </Card>
          </div>
        )}
        {tab === "extensions" && (
          <div className="settings__extensions">
            <Card
              variant="outlined"
              className={`${classes.card} settings__user`}
            >
              <h3>GitHub</h3>
              <p>Pin your GitHub repositories to your profile.</p>
              <p>
                Repositories will be disappear from your profile if you remove
                the OAuth association with GitHub.
              </p>
              <div className="settings__user--github">
                {input.value.github && (
                  <button type="button" onClick={repoGithub}>
                    Get Repositories from GitHub
                  </button>
                )}
                <div className="settings__user--repo">
                  {fullInfo.data &&
                    fullInfo.data.repo.map((repo) => {
                      return <SetRepo key={repo.id} repo={repo} />;
                    })}
                </div>
              </div>
            </Card>
          </div>
        )}
      </form>
    </div>
  ) : null;
}
