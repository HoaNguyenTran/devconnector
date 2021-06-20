import { Skeleton } from "@material-ui/lab";
import React, { lazy, Suspense } from "react";
import Banner from "../../../components/Banner/Banner";
import RightSidebar from "../../../components/Sidebar/RightSideBar/RightSideBar";
import Main from "../Main/Main";
import "./Presentation.scss";

const TagSideBar = lazy(() =>
  import("../../../components/Sidebar/TagSideBar/TagSideBar")
);

export const Presentation = () => {
  return (
    <div className="presentation">
      <div className="presentation__left">
        <Banner />
        <Suspense fallback={<Skeleton variant="rect" height={380} />}>
          <TagSideBar />
        </Suspense>
      </div>
      <div className="presentation__center">
        <Main />
      </div>
      <div className="presentation__right">
        <RightSidebar />
      </div>
    </div>
  );
};
