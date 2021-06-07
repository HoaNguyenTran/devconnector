import React from 'react'
import moment from "moment"
import { Card, makeStyles } from '@material-ui/core';
import "./CardInfo.scss"
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    backgroundColor: "#f9f9fa",
  },
});

export const CardInfo = (props) => {
  const classes = useStyles()
  
    const {color, avatar, name, username, bio, employerTitle, employerUrl, employerName, location, education, dateJoin} = props;
    return (
        <Card className={classes.root}>
            <div
              className="cardInfo__background"
              style={{ backgroundColor: color || "#000000" }}
            ></div>
            <div className="cardInfo__avatar">
              <img src={avatar} alt="" />
            </div>
            <div className="cardInfo__name">
              <Link to={`/${username}`}>{name}</Link>
            </div>
            <div className="cardInfo__info">
              <div className="cardInfo__bio">
                <span>{bio}</span>
              </div>
              <div className="cardInfo__btn">
                <button>Follow</button>
              </div>
              <div>
                {employerTitle && (
                  <div>
                    <p className="cardInfo__title">Work</p>
                    <p>
                      {employerTitle}
                      {employerName && (
                        <span>
                          {" "}
                          at{" "}
                          {employerUrl ? (
                            <a
                              href={employerUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {employerName}
                            </a>
                          ) : (
                            <p>{employerName}</p>
                          )}
                        </span>
                      )}
                    </p>
                  </div>
                )}

                {location && (
                  <div>
                    <p className="cardInfo__title">Location</p>
                    <p>{location}</p>
                  </div>
                )}
                {education && (
                  <div>
                    <p className="cardInfo__title">Education</p>
                    <p>{education}</p>
                  </div>
                )}
                <div>
                  <p className="cardInfo__title">Joined</p>
                  <p>{moment(dateJoin).format("MMM Do, YYYY")}</p>
                </div>
              </div>
            </div>
          </Card>
    )
}
