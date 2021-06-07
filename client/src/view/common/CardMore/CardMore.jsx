import { Card, Divider, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./CardMore.scss";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#f9f9fa",
  },
});

export const CardMore = ({ data, name, username }) => {
  const classes = useStyles();

  const renderPost = () =>
    data.map((post, index1) => (
      <div key={index1}>
        <Divider />
        <Link to={`/${username}/${post.slug}`}>
          <div className="cardMore__post">
            <div>{post.title}</div>
            <div className="cardMore__tags">
              {post.tags.map((tag, index2) => (
                <p key={index2}>#{tag.value}</p>
              ))}
            </div>
          </div>
        </Link>
      </div>
    ));

  return (
    <Card className={`cardMore ${classes.root}`}>
      <div className="cardMore__title">
        <h3>
          More form <Link to={`/${username}`}>{name}</Link>
        </h3>
      </div>
      <div className="cardMore__content">{renderPost()}</div>
    </Card>
  );
};
