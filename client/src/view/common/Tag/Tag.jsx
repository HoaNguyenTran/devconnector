import React from "react";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import "./Tag.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowTag } from "../../../redux/actions/feature.action";
import useDialog from "../../../hook/useDialog";
import DialogCommon from "../Dialog/DialogCommon";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    border: "1px solid #ccc",
    borderRadius: ".5rem",
  },
});

export const Tag = ({
  name,
  description,
  image,
  countPost,
  randomColor,
  status,
  display,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const fetchFollow = (data) => dispatch(fetchFollowTag(data));
  const {auth} = useSelector((state) => state.user);
  const [isShowing, toggle] = useDialog();

  const handleClick = () => {
    if (auth.data) {
      fetchFollow({ name, status: !status });
    } else toggle();
  };
  
  return (
    <Card className={`${classes.card} tag`}>
      <div
        style={{ backgroundColor: randomColor, width: "100%", height: ".8rem" }}
      />
      <div className="tag__content">
        <Link to={`/tag/${name}`} className="tag__content--title">#{name}</Link>
        <p className="tag__content--description">{description}</p>
        <p className="tag__content--count">{countPost} posts published</p>
        {display ? (
          <button
            className="tag__content--btn tag__content--btn-following"
            onClick={handleClick}
          ></button>
        ) : status ? (
          <button
            className="tag__content--btn tag__content--btn-following"
            onClick={handleClick}
          >
            Following
          </button>
        ) : (
          <button
            className="tag__content--btn tag__content--btn-follow"
            onClick={handleClick}
          >
            Follow
          </button>
        )}
        <img src={image} alt="" className="tag__content--image" />
      </div>
      {isShowing && <DialogCommon isShowing={isShowing} hide={toggle} />}
    </Card>
  );
};
