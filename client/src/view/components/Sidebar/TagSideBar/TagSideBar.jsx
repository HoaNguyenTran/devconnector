import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useDialog from "../../../../hook/useDialog";
import { fetchFollowTag, fetchGetTag } from "../../../../redux/actions/feature.action";
import DialogCommon from "../../../common/Dialog/DialogCommon";
import "./TagSideBar.scss";

const TagSideBar = () => {
  const { auth } = useSelector((state) => state.user);
  const { getTag } = useSelector((state) => state.feature);
  const { full } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [isShowing, toggle] = useDialog();

  useEffect(() => {
    dispatch(fetchGetTag());
    // eslint-disable-next-line
  }, []);

  const handleClick = (data) => {
    if (auth.data) {
      dispatch(fetchFollowTag({ name: data, status: true }));
    } else toggle();
  };

  const renderTags = () => {
    if (full.data) {
      if (full.data.followTag.length > 0)
        return  (
          <div className="tagsidebar">
            <div className="tagsidebar__title">Personal Tags</div>
            <div className="tagsidebar__content">
              {full.data.followTag.slice(0,20).map((item, index) => (
                <div key={index} className="tagsidebar__item">
                  <Link
                    
                    to={`/tag/${item}`}
                    className="tagsidebar__item--link"
                  >
                    #{item}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        );
      else return popularTag;
    }
  };

  const popularTag = (
    <div className="tagsidebar">
      <div className="tagsidebar__title">Popular Tags</div>
      <div className="tagsidebar__content">
        {getTag.data &&
          getTag.data.slice(0, 20).map((item, index) => (
            <div key={index} className="tagsidebar__item">
              <Link
                to={`/tag/${item.name}`}
                className="tagsidebar__item--link"
              >
                #{item.name}
              </Link>
              <button className="tagsidebar__item--btn" onClick={() => handleClick(item.name)}>
                Follow
              </button>
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <div className="tagSideBar">
      {auth.data ? renderTags() : getTag.data && popularTag}
      {isShowing && <DialogCommon isShowing={isShowing} hide={toggle} />}
    </div>
  );
};

export default TagSideBar;