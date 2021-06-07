import { Dialog } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import keys from "../../../../config/keys";
import {
  fetchAddTag,
  fetchFollowTag,
  fetchGetTag,
} from "../../../../redux/actions/feature.action";
import { validateBlur } from "../../../../utils/validation";
import { Tag } from "../../../common/Tag/Tag";
import Slide from "@material-ui/core/Slide";
import "./Tags.scss";

const useStyles = makeStyles({
  card: {
    border: "1px solid #ccc",
    borderRadius: ".5rem",
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Tags = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const checkAuth = useSelector((state) => state.user.auth);
  const {addTag, getTag, followTag} = useSelector((state) => state.feature);

  const [value, setValue] = useState({});
  const [url, setUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);
  const [array, setArray] = useState([]);

  const fetchAdd = (data) => dispatch(fetchAddTag(data));
  const fetchGet = () => dispatch(fetchGetTag());
  const fetchFollow = (data) => dispatch(fetchFollowTag(data));

  useEffect(() => {
    fetchGet();
    notify();
    // eslint-disable-next-line
  }, [addTag.data]);

  useEffect(() => {
    if (checkAuth.data) {
      fetchFollow({ action: true });
    }
    // eslint-disable-next-line
  }, [checkAuth.data]);

  useEffect(() => {
    if (followTag.data && getTag.data) handleArray();
    if (!checkAuth.data && getTag.data) handleArray();
    // eslint-disable-next-line
  }, [followTag.data, getTag.data]);

  const notify = () => {
    if (addTag.error) {
      toast.error(addTag.error.msg);
      toast.clearWaitingQueue();
    }
    if (addTag.data) {
      toast.success(addTag.data.msg);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUrl(e.target.files[0]);
      setFile(URL.createObjectURL(e.target.files[0]));
    } else {
      setShow(true);
      if (e.target.name === "name") {
        setValue({ ...value, name: e.target.value.toLowerCase() });
      } else setValue({ ...value, [e.target.name]: e.target.value });
    }
  };

  const handleBlur = (e) => {
    const error = validateBlur(e.target.name, e.target.value);
    setErrors({ ...errors, ...error });
  };

  const isUrl = () => {
    setToggle(false);
    if (url) {
      const data = new FormData();
      data.append("file", url);
      data.append("upload_preset", "devconnector");
      data.append("cloud_name", keys.CLOUD_NAME);
      data.append("folder", "tags");

      axios
        .post(
          `https://api.cloudinary.com/v1_1/${keys.CLOUD_NAME}/image/upload`,
          data
        )
        .then((res) => {
          fetchAdd({ ...value, image: res.data.url });
        })
        .catch((err) => console.log(err));
    } else {
      fetchAdd(value);
    }
    setValue({});
    setFile(null);
    setUrl(null);
    setShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (JSON.stringify(value) !== JSON.stringify({})) {
      const arr = Object.keys(errors);

      if (arr.length > 0) {
        arr.forEach((item) => {
          if (errors[item] !== "") {
            return;
          }
        });
        isUrl();
      }
    } else return;
  };

  const handleArray = () => {
    const arr = [];
    getTag.data.forEach((item) => {
      if (followTag.data && followTag.data.includes(item.name))
        arr.push({ ...item, isFollow: true });
      else arr.push({ ...item, isFollow: false });
    });
    return setArray(arr);
  };

  return (
    <div className="tags">
      <ToastContainer autoClose={3000} limit={1} transition={Zoom} />
      <h1 className="tags__title">Top tags</h1>

      {checkAuth.data && (
        <div className="tags__add">
          <div className="tags__add--new">
            <button type="text" onClick={() => setToggle(true)}>
              Add new tag
            </button>
          </div>
          {toggle && (
            <Dialog
              open={toggle}
              onClose={() => setToggle(false)}
              TransitionComponent={Transition}
              className={`${classes.card} tags__add--form`}
            >
              <form autoComplete="off" onSubmit={handleSubmit}>
                <h3 className="tags__add--title">Add New Tag</h3>
                <div className="tags__add--block">
                  <label className="tags__add--label">Name Tag</label>
                  <div className="tags__add--input">
                    <input
                      type="text"
                      placeholder="Name Tag"
                      name="name"
                      value={value.name || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="tags__add--error">{errors.name}</div>
                </div>
                <div className="tags__add--block">
                  <label className="tags__add--label">Description</label>
                  <div className="tags__add--input">
                    <input
                      type="text"
                      placeholder="Description"
                      name="description"
                      value={value.description || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div className="tags__add--error">{errors.description}</div>
                </div>
                <div className="tags__add--block">
                  <label className="tags__add--label">Image</label>
                  <div className="tags__add--image">
                    <div className="tags__add--input tags__add--file">
                      <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleChange}
                      />
                    </div>
                    {file && (
                      <div className="tags__add--img">
                        <img src={file} alt="" />
                      </div>
                    )}
                  </div>
                  <div className="tags__add--error"></div>
                </div>
                <div className="tags__add--block">
                  <label className="tags__add--label">Color</label>
                  <div className="tags__add--input tags__add--color">
                    <input
                      type="text"
                      name="color"
                      value={value.color || "#FFFFFF"}
                      onChange={handleChange}
                      className="tags__add--color-input"
                    />
                    <input
                      type="color"
                      name="color"
                      value={value.color || "#FFFFFF"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="tags__add--color-picker"
                    />
                  </div>
                  <div className="tags__add--error">{errors.color}</div>
                </div>
                <div className="tags__add--block">
                  <label className="tags__add--label">Background Color</label>
                  <div className="tags__add--input tags__add--color">
                    <input
                      type="text"
                      name="bgcolor"
                      value={value.bgcolor || "#000000"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="tags__add--color-input"
                    />
                    <input
                      type="color"
                      name="bgcolor"
                      value={value.bgcolor || "#000000"}
                      onChange={handleChange}
                      className="tags__add--color-picker"
                    />
                  </div>
                  <div className="tags__add--error">{errors.bgcolor}</div>
                </div>
                {show && (
                  <div className="tags__add--save">
                    <button type="submit">Add</button>
                  </div>
                )}
              </form>
            </Dialog>
          )}
        </div>
      )}

      <div className="tags__list">
        {array.map((item) => {
          if (item.isFollow)
            return (
              <Tag
                key={item._id}
                status={true}
                {...item}
                randomColor={`#${Math.floor(Math.random() * 16777215).toString(
                  16
                )}`}
              />
            );
          else
            return (
              <Tag
                key={item._id}
                {...item}
                status={false}
                randomColor={`#${Math.floor(Math.random() * 16777215).toString(
                  16
                )}`}
              />
            );
        })}
      </div>
    </div>
  );
};
