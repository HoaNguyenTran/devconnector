import React from "react";
import { useDispatch } from "react-redux";
import { fetchSelectRepo } from "../../../redux/actions/profile.action";
import "./SetRepo.scss";

export const SetRepo = (props) => {
  const dispatch = useDispatch();
  const fetchSelect = (data) => dispatch(fetchSelectRepo(data));

  return (
    <div className={props.repo.status ? "setRepo setRepo__active" : "setRepo"}>
      <div className="setRepo__title">
        <div className="setRepo__name">{props.repo.name}</div>
        {props.repo.fork && <div className="setRepo__fork">Fork</div>}
      </div>
      <button
        type="button"
        onClick={() =>
            fetchSelect({ id: props.repo.id, status: !props.repo.status })
        }
      >

        <div className="setRepo__btn">{props.repo.status ? "Remove" : "Select"}</div>
      </button>
    </div>
  );
};
