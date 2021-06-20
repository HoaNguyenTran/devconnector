import { Card } from "@material-ui/core";
import moment from "moment";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useDatePost from "../../../hook/useDatePost";
import "./ArticleComponent.scss";

export const ArticleComponent = ({
  data: {
    username,
    name,
    createdAt,
    updatedAt,
    slug,
    cover,
    title,
    avatar,
    tags,
    timeEstimate,
    id,
  },
}) => {
  const [datePost, handleDatePost] = useDatePost();

  useEffect(() => {
    handleDatePost({ createdAt, updatedAt });
    // eslint-disable-next-line
  }, []);

  return (
    <Card className="article">
      <Link to={`/${username}/${slug}`}>
        {id === 0 && (
          <div className="article__cover">
            <img src={cover} alt="" />
          </div>
        )}
        <div className="article__wrapper">
          <div className="article__title">
            <div className="article__title--avt">
              <Link to={`/${username}`}>
                <img src={avatar} alt="" />
              </Link>
            </div>
            <div className="article__title--info">
              <div className="article__title--name">
                <Link to={`${username}`}>{name}</Link>
              </div>
              <div className="article__title--time">
                <time dateTime={updatedAt}>{datePost}</time>
                {moment().diff(updatedAt, "days") < 1 && (
                  <time dateTime={updatedAt}>
                    ({moment(updatedAt).fromNow()})
                  </time>
                )}
              </div>
            </div>
          </div>
          <div className="article__content">
            <div className="article__content--name">
              <Link to={`/${username}/${slug}`}>
                <span>{title}</span>
              </Link>
            </div>
            <div className="article__content--tags">
              {tags.map((tag, index) => (
                <Link to={`/tag/${tag.value}`} key={index}>
                  #{tag.value}
                </Link>
              ))}
            </div>
            <div className="article__bottom">
              <div className="article__bottom--details">
                <div className="article__bottom--like">
                  <svg
                    className="crayons-icon"
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z"></path>
                  </svg>
                  <p>0 <span>reactions</span></p>
                </div>
                <div className="article__bottom--comment">
                  <svg
                    className="crayons-icon"
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z"></path>
                  </svg>
                  <p>0 <span>comments</span></p>
                </div>
              </div>
              <div className="article__bottom--save">
                <small>{timeEstimate} min read</small>
                <button>Save</button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};
