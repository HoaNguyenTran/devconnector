import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router";
import { fetchSlugPost } from "../../../../redux/actions/feature.action";
import { Content } from "../../../common/Content/Content";
import Footer from "../../../components/Footer/Footer";

const Post = (props) => {
  const dispatch = useDispatch();
  const {slugPost} = useSelector((state) => state.feature);

  useEffect(() => {
    dispatch(fetchSlugPost(props.match.url));
    // eslint-disable-next-line
  }, [props.match.url]);

  useEffect(() => {
    if (slugPost.data) {
      document.title = slugPost.data.postMain[0].title;
    }
  }, [slugPost.data])

  return (
    <div>
      {slugPost.data && (
        <div>
          <Content slugPost={slugPost.data} />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default withRouter(Post);