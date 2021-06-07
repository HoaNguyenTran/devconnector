import { FormControl, MenuItem, Select } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWindowSize } from "../../../../hook/useWindowSize";
import { ArticleComponent } from "../../../common/ArticleComponent/ArticleComponent";
import "./Main.scss";
import { Skeleton } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { fetchFullPost } from "../../../../redux/actions/feature.action";

const Main = () => {
  const size = useWindowSize();
  const [option, setOption] = useState("Feed");
  const [articles, setArticles] = useState([]);
  const { fullPost } = useSelector((state) => state.feature);
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAgain = () => {
      setStep(step + 1);
      console.log("b")
      if (articles.length > 0) {
        console.log("c")
        dispatch(fetchFullPost({skip: step*20}));
      }
    };

    const handleScroll = () => {
      const html = document.documentElement;
      const body = document.body;
      const windowheight =
        "innerHeight" in window ? window.innerHeight : html.offsetHeight;

      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      );
      const windowBottom = windowheight + window.pageYOffset;
      if (windowBottom >= docHeight ) {
        console.log("a")
        fetchAgain();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [articles]);

  useEffect(() => {
    dispatch(fetchFullPost({ skip: step * 20 }));
  }, []);

  useEffect(() => {
    if (fullPost.data) {
      setArticles([...articles, ...fullPost.data]);
    }
  }, [fullPost.data]);

  const handleChange = (e) => {
    setOption(e.target.value);
  };

  return (
    <main className="main">
      <header>
        <button onClick={() => dispatch(fetchFullPost({ skip: 3 }))}>
          Click
        </button>
        <h1>Post</h1>
        {size.width > 768 ? (
          <nav>
            <Link to="/">Feed</Link>
            <Link to="/">Week</Link>
            <Link to="/">Month</Link>
            <Link to="/">Year</Link>
            <Link to="/">Infinity</Link>
            <Link to="/">Latest</Link>
          </nav>
        ) : (
          <FormControl display="none">
            <Select value={option} onChange={handleChange} displayEmpty>
              <MenuItem value="Feed">Feed</MenuItem>
              <MenuItem value="Week">Week</MenuItem>
              <MenuItem value="Month">Month</MenuItem>
              <MenuItem value="Year">Year</MenuItem>
              <MenuItem value="Infinity">Infinity</MenuItem>
              <MenuItem value="Latest">Latest</MenuItem>
            </Select>
          </FormControl>
        )}
      </header>
      <div className="articles">
        {articles
          ? articles.map((article, id) => {
              return <ArticleComponent key={id} data={{...article, id}} />;
            })
          : [...Array(10)].map((item, index) => (
              <Skeleton key={index} variant="rect" width={280} height={380} />
            ))}
      </div>
    </main>
  );
};

export default Main;
