import React, { useEffect, useState } from "react";
import { Card, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAuthorRoute,
  fetchPostFullInfo,
} from "../../../../redux/actions/profile.action";
import NotFound from "../../../components/NotFound/NotFound";
import "./Profile.scss";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import CakeIcon from "@material-ui/icons/Cake";
import EmailIcon from "@material-ui/icons/Email";
import LinkIcon from "@material-ui/icons/Link";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Footer from "../../../components/Footer/Footer";
import { GetRepo } from "../../../common/Repo/GetRepo";
import moment from "moment";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: "8px",
    backgroundColor: "#f9fafa",
  },
}));

export default function Profile() {
  const { username } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  const fetchFull = (data) => dispatch(fetchPostFullInfo(data));
  const fetchAuthor = (data) => dispatch(fetchAuthorRoute(data));

  const fullInfo = useSelector((state) => state.profile.full);
  const authorRoute = useSelector((state) => state.profile.author);

  const [full, setFull] = useState(null);
  const [more, setMore] = useState(false);
  const [author, setAuthor] = useState(false);

  const cardBanner = ({ data, title }) => {
    return (
      <Card className={`${classes.root} profile__banner--item`}>
        <h3 className="profile__banner--title">{title}</h3>
        <Divider />
        <p className="profile__banner--des">{data}</p>
      </Card>
    );
  };

  useEffect(() => {
    fetchFull({ username });
    fetchAuthor({ username });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (
      (!fullInfo.loading && fullInfo.data) ||
      (!fullInfo.loading && fullInfo.error)
    ) {
      setFull(fullInfo);
      if (fullInfo.data) {
        document.title = fullInfo.data.name;
      }
    }
  }, [fullInfo]);

  useEffect(() => {
    if (
      (!authorRoute.loading && authorRoute.data) ||
      (!authorRoute.loading && authorRoute.error)
    ) {
      setAuthor(true);
    }
  }, [authorRoute]);

  const handleDatePost = (updatedAt) => {
    let string = "";

    if (moment(updatedAt).format("YYYY") !== moment().year()) {
      string += moment(updatedAt).format("MMM Do");
    } else {
      string += moment(updatedAt).format("MMM Do YYYY");
    }

    return string;
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    let month = new Array(12);
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    return `${
      month[newDate.getMonth()]
    }  ${newDate.getDate()}, ${newDate.getFullYear()}`;
  };

  const profile =
    full &&
    (full.data ? (
      <div className="profile">
        <div
          className="profile__background"
          style={{ backgroundColor: full.data.color || "#000000" }}
        ></div>
        <div className="profile__content">
          <div className="profile__header">
            <div
              className="profile__header--block"
              style={{ backgroundColor: full.data.color || "#000000" }}
            >
              <img src={full.data.avatar} alt="" />
            </div>
            {author && (
              <button className="profile__header--feature">
                {authorRoute.data ? (
                  <Link to="/settings">Edit profile</Link>
                ) : (
                  <Link to="#">Follow</Link>
                )}
              </button>
            )}
          </div>
          <Card className={classes.root}>
            <div className="profile__details">
              <div className="profile__details--name">
                <h2>{full.data.name}</h2>
              </div>
              <div className="profile__details--bio">
                <h4>{full.data.bio}</h4>
              </div>
              <div className="profile__details--info">
                {full.data.location && (
                  <div className="profile__details--item">
                    <LocationOnIcon />
                    <span>{full.data.location}</span>
                  </div>
                )}
                <div className="profile__details--item">
                  <CakeIcon />
                  <span>Joined on {formatDate(full.data.dateJoin)}</span>
                </div>
                {full.data.displayEmail && (
                  <a
                    href={`mailto:${full.data.email}`}
                    target="_blank"
                    rel="noreferrer"
                    className="profile__details--item"
                  >
                    <EmailIcon />
                    <span>{full.data.email}</span>
                  </a>
                )}
                <div className="profile__details--item">
                  {full.data.websiteUrl && (
                    <a
                      href={full.data.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="profile__details--email"
                    >
                      <LinkIcon />
                    </a>
                  )}
                  {full.data.facebook && (
                    <a
                      href={full.data.facebook}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FacebookIcon />
                    </a>
                  )}
                  {full.data.twitter && (
                    <a
                      href={full.data.twitter}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <TwitterIcon />
                    </a>
                  )}
                  {full.data.github && (
                    <a href={full.data.github} target="_blank" rel="noreferrer">
                      <GitHubIcon />
                    </a>
                  )}
                  {full.data.instagram && (
                    <a
                      href={full.data.instagram}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <InstagramIcon />
                    </a>
                  )}
                  {full.data.linkedin && (
                    <a
                      href={full.data.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <LinkedInIcon />
                    </a>
                  )}
                </div>
              </div>
              <Divider />
              <div className="profile__details--definition">
                {full.data.education && (
                  <div className="profile__details--education">
                    <p className="profile__details--title">Education</p>
                    <p>{full.data.education}</p>
                  </div>
                )}
                {full.data.employerTitle && (
                  <div className="profile__details--work">
                    <p className="profile__details--title">Work</p>
                    <div className="profile__details--content">
                      <p>{full.data.employerTitle}</p>
                      {full.data.employerName && (
                        <span>
                          at{" "}
                          {full.data.employerUrl ? (
                            <a
                              href={full.data.employerUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {full.data.employerName}
                            </a>
                          ) : (
                            <p>{full.data.employerName}</p>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {!more && (
                  <button
                    className="profile__more"
                    onClick={() => setMore(true)}
                  >
                    More info about @{full.data.username}
                  </button>
                )}
              </div>
            </div>
          </Card>
          <div>
            {more && (
              <div className="profile__banner">
                {full.data.repo.length > 0 && (
                  <Card className={`${classes.root} profile__banner--item`}>
                    <h3 className="profile__banner--title">
                      GitHub Repositories
                    </h3>
                    {full.data.repo.map((repo) => {
                      return (
                        repo.status && <GetRepo key={repo.id} repo={repo} />
                      );
                    })}
                  </Card>
                )}
                {full.data.learing &&
                  cardBanner({
                    data: full.data.learing,
                    title: "Currently Learning",
                  })}
                {full.data.skills &&
                  cardBanner({
                    data: full.data.skills,
                    title: "Skills Language",
                  })}
                {full.data.hacking &&
                  cardBanner({
                    data: full.data.hacking,
                    title: "Currently Hacking On",
                  })}
                {full.data.available &&
                  cardBanner({
                    data: full.data.available,
                    title: "Available For",
                  })}
              </div>
            )}
            {full.data.post.map((item, index) => (
              <Card key={index} className="profile__post">
                <div className="profile__post--title">
                  <div>
                    <img src={full.data.avatar} alt="" />
                  </div>
                  <div>
                    <div>{full.data.name}</div>
                    <div>{handleDatePost(item.updatedAt)}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="profile__footer">
          <Footer />
        </div>
      </div>
    ) : (
      <NotFound />
    ));

  return <>{profile}</>;
}
