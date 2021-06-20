import { Card, makeStyles } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import "./RightSideBar.scss";

const listings = [
  {
    id: 1,
    mainTitle: "Go/JS/PHP Software engineer looking for new opportunities",
    subText: "hire",
  },
  {
    id: 2,
    mainTitle: "Live-Coding on YouTube continues tomorrow",
    subText: "events",
  },
  {
    id: 3,
    mainTitle: "Product Designer",
    subText: "jobs",
  },
  {
    id: 4,
    mainTitle: "FREE COURSE, this weekend only: Ship better code faster",
    subText: "education",
  },
  {
    id: 5,
    mainTitle: "MEAN / MERN Stack 100+ Learning Resources {FREE}",
    subText: "misc",
  },
];

const news = [
  {
    id: 1,
    mainTitle: "Game Dev Digest — Issue #83 - How and Why",
  },
  {
    id: 2,
    mainTitle: "JavaScript News and Updates of February 2021",
  },
  {
    id: 3,
    mainTitle: "🗞 What's new and special in Create Go App CLI v1.7.0?",
  },
  {
    id: 4,
    mainTitle:
      "Google’s Termination of Dr. Mitchell, Clubhouse Security, Low-Code Tools, & more on DevNews!",
    subText: "1 comment",
  },
  {
    id: 5,
    mainTitle: "Ember 3.25 Released",
  },
];

const help = [
  {
    id: 1,
    mainTitle: "How to start a programming blog?",
  },
  {
    id: 2,
    mainTitle: "How to use @yarnpkg/core?",
    subText: "2 comments",
  },
  {
    id: 3,
    mainTitle: "Need advice regarding web development",
    subText: "5 comments",
  },
];

const useStyles = makeStyles({
  root: {
    backgroundColor: "#f9f9fa",
  },
});

const renderCard = (classes, tag, articles) => {
  return (
    <Card className={`rightsidebar__card ${classes.root}`}>
      <header>
        <h3>{tag}</h3>
        {tag === "Listings" && (
          <a href="/#">
            <small>See all</small>
          </a>
        )}
      </header>
      <ul>
        {articles.map((item) => {
          return (
            <li key={item.id}>
              <Link to="/">{item.mainTitle}</Link> <br />
              <small>{item.subText}</small>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

const RightSidebar = () => {
  const classes = useStyles();
  return (
    <aside className="rightsidebar">
      {renderCard(classes, "Listings", listings)}
      {renderCard(classes, "#news", news)}
      {renderCard(classes, "#help", help)}
    </aside>
  );
};

export default RightSidebar;
