import React, { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import { Link } from "react-router-dom";
import "./Content.scss";
import { Card } from "@material-ui/core";
import { CardInfo } from "../CardInfo/CardInfo";
import { CardMore } from "../CardMore/CardMore";
import useDatePost from "../../../hook/useDatePost";

export const Content = ({slugPost}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const {
    tags,
    title,
    content,
    slug,
    action,
    timeEstimate,
    createdAt,
    updatedAt,
    cover,
  } = slugPost.postMain[0];
  
  const {
    name,
    username,
    avatar,
    dateJoin,
    bio,
    color,
    employerTitle,
    employerName,
    employerUrl,
    education,
    location,
  } = slugPost.profile[0]

  const [datePost, handleDatePost] = useDatePost();

  useEffect(() => {
    setEditorState(content);
    handleDatePost({createdAt, updatedAt});
  }, []);

  const sideBar = (
    <div className="content__sidebar">
      <div className="content__sidebar--wrap"> 
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="crayons-icon"
        >
          <path d="M21.179 12.794l.013.014L12 22l-9.192-9.192.013-.014A6.5 6.5 0 0112 3.64a6.5 6.5 0 019.179 9.154zM4.575 5.383a4.5 4.5 0 000 6.364L12 19.172l7.425-7.425a4.5 4.5 0 10-6.364-6.364L8.818 9.626 7.404 8.21l3.162-3.162a4.5 4.5 0 00-5.99.334l-.001.001z"></path>
        </svg>
      </button>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          aria-hidden="true"
          className="crayons-icon"
        >
          <path
            d="M5.645 8.013c.013-.265-.261-.323-.4-.183-1.16 1.17-1.822 3.865-.344 7.32.294.961 1.938 3.19.84 6.131l-.003.006c-.094.255.206.404.366.263 1.395-1.226 1.933-3.593 1.1-6.375-.488-1.657-1.955-4.226-1.559-7.162zm-3.22 2.738c.05-.137-.124-.417-.326-.225-.939.893-1.316 2.863-.976 4.605.547 2.878 2.374 3.526 2.066 6.629-.028.102.176.38.348.154 1.546-2.033.409-4.453-.241-6.006-1.005-2.386-1.087-4.118-.871-5.157z"
            fill="#08090A"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.622 7.223l8.579-3.68c.598-.256 1.087.547.6.985l-6.618 5.941c.881 2.043 2.738 6.34 2.931 6.775 1.348 3.031-2.055 4.918-3.807 3.583a7.027 7.027 0 01-.623-.574c-.974-.965-2.419-2.398-5.207-1.877.284-2.115-.313-3.737-.883-5.288-.38-1.032-.747-2.032-.837-3.124-.346-3.329 3.763-8.23 4.696-7.953.386.115.326 1.229.266 2.319-.051.948-.102 1.88.143 2.12.145.142.428.43.76.773zM11.5 16.5l2.5.5 2.5 2 1-.5-2-4.5-1.5-4-1.5-1-1-1-1-1.5L10 8l-.5 1.5 1 2.5 1 4.5z"
          ></path>
        </svg>
      </button>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="crayons-icon"
        >
          <path d="M5 2h14a1 1 0 011 1v19.143a.5.5 0 01-.766.424L12 18.03l-7.234 4.536A.5.5 0 014 22.143V3a1 1 0 011-1zm13 2H6v15.432l6-3.761 6 3.761V4z"></path>
        </svg>
      </button>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          role="img"
          aria-labelledby="am65744ftdj5x365i858mbg1gt1y31kf"
          className="dropdown-icon crayons-icon"
        >
          <title id="am65744ftdj5x365i858mbg1gt1y31kf">More...</title>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 12a2 2 0 11-4 0 2 2 0 014 0zm7 0a2 2 0 11-4 0 2 2 0 014 0zm5 2a2 2 0 100-4 2 2 0 000 4z"
          ></path>
        </svg>
      </button>
    </div>
    </div>
  );

  return (
    <div className="content">
      <div className="content__wrap">
        {sideBar}
        <div className="content__main">
          <Card className="content__main--card">
            {cover && (
              <div className="content__cover">
                <img className="content__cover--img" src={cover} alt="" />
              </div>
            )}
            <div className="content__header">
              <div className="content__title">
                <h1>{title}</h1>
              </div>
              <div className="content__tags">
                {tags.map((item, index) => (
                  <a
                    className="content__tags--tag"
                    key={index}
                    href={`/tags/${item.value}`}
                    style={{ backgroundColor: item.bgcolor, color: item.color }}
                  >
                    #{item.value}
                  </a>
                ))}
              </div>
              <div className="content__info">
                <div className="content__info--avatar">
                  <img src={avatar} alt="" />
                </div>
                <div className="content__info--name">
                  <Link to={`/${username}`}>{name}</Link>
                </div>
                <div className="content__info--date">
                  <time dateTime={updatedAt}>{datePost}</time>
                  <span>・{timeEstimate} min read</span>
                </div>
              </div>
            </div>
            <div className="content__content">
              <div dangerouslySetInnerHTML={{ __html: editorState }}></div>
            </div>
          </Card>
        </div>
        <div className="content__user">
          <div className="content__user--card">
         
          <CardInfo
            color={color}
            avatar={avatar}
            name={name}
            username={username}
            bio={bio}
            employerTitle={employerTitle}
            employerUrl={employerUrl}
            employerName={employerName}
            location={location}
            education={education}
            dateJoin={dateJoin}
          />

          <CardMore
            data={slugPost.postSub}
            name={name}
            username={username}
          />
           </div>
        </div>
      </div>
    </div>
  );
};
