import { Divider } from "@material-ui/core";
import React from "react";
import "./GetRepo.scss";

export const GetRepo = (props) => {
  return (
    <div className="getrepo">
      <Divider />
      <a className="getrepo__content" href={props.repo.url} target="_blank" rel="noreferrer">
        <h4 className="getrepo__title">{props.repo.name}</h4>
        {props.repo.fork && <div className="getrepo__fork">Fork</div>}
        <p>{props.repo.des}</p>
        <p>{props.repo.language}</p>
      </a>
    </div>
  );
};
