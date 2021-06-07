import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Select, { components } from "react-select";
import { convertToRaw, EditorState } from "draft-js";
import chroma from "chroma-js";
import draftToHtml from "draftjs-to-html";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Card, Fade, Menu, MenuItem } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

import {
  fetchGetTag,
  fetchSavePost,
} from "../../../../redux/actions/feature.action";
import keys from "../../../../config/keys";
import Spinner from "../../../components/Spinner/Spinner";
import { Edit } from "../../../common/Edit/Edit";
import "./New.scss";

const SingleValue = ({ children, ...props }) => (
  <components.SingleValue {...props}>{children}</components.SingleValue>
);

const tagStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    ":focus": { border: "none" },
  }),
  menu: (styles) => ({
    ...styles,
    zIndex: 10,
  }),
  placeholder: (styles) => ({
    ...styles,
    fontSize: "14px",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    const bgcolor = chroma(data.bgcolor);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.bgcolor
        : isFocused
        ? bgcolor.alpha(0.5).css()
        : null,
      cursor: isDisabled ? "not-allowed" : "default",
      fontSize: "1rem",
      ":active": {
        ...styles[":active"],
        backgroundColor:
          !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  multiValue: (styles, { data }) => {
    return {
      ...styles,
      backgroundColor: data.bgcolor,
      fontSize: "1rem",
      borderRadius: "4px",
      marginRight: ".8rem",
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    fontSize: "1rem",
    padding: "5px",
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
};
const StyledMenu = withStyles({
  paper: {
    display: "flex",
    flexWrap: "wrap",
    padding: 0,
  },
  list: {
    padding: 0,
    fontSize: "14px",
  },
})((props) => (
  <Menu
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    transitionDuration={3}
    {...props}
  />
));

export const New = () => {
  const dispatch = useDispatch();
  const fetchTags = () => dispatch(fetchGetTag());
  const fetchSave = (data) => dispatch(fetchSavePost(data));
  const { getTag, savePost } = useSelector((state) => state.feature);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [arr, setArr] = useState([]);
  const [url, setUrl] = useState(null);
  const [value, setValue] = useState({});
  const [flag, setflag] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [toggle, setToggle] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    if (
      !value.title ||
      value.tags.length < 1 ||
      draftToHtml(convertToRaw(editorState.getCurrentContent())).length <= 8
    ) {
      setflag(false);
    } else setflag(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      return (e.returnValue = "Are you sure you want to close editor?");
    });
  }, []);

  useEffect(() => {
    fetchTags();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    handleArray();
    // eslint-disable-next-line
  }, [getTag]);

  const handleTypeSelect = (tags) => {
    setValue({ ...value, tags });
  };

  function onEditorStateChange(data) {
    setEditorState(data);
    setValue({
      ...value,
      content: draftToHtml(convertToRaw(data.getCurrentContent())),
    });
  }

  const getHtml = (editorState) =>
    draftToHtml(convertToRaw(editorState.getCurrentContent()));

  function handleChange(e) {
    if (e.target.name === "cover") {
      setUrl(e.target.files[0]);
    } else setValue({ ...value, title: e.target.value });
  }

  const handleArray = () => {
    let temp = [];
    if (getTag.data) {
      for (let i = 0; i < getTag.data.length; i++) {
        temp.push({
          value: getTag.data[i].name,
          label:
            getTag.data[i].name.charAt(0).toUpperCase() +
            getTag.data[i].name.slice(1),
          color: getTag.data[i].color,
          bgcolor: getTag.data[i].bgcolor,
        });
      }
      setArr(temp);
    }
  };

  const handleSubmit = (action) => {
    const text = editorState
      .getCurrentContent()
      .getPlainText("\u000A")
      .match(/[^\s]+/g);
    let timeEstimate = 0;
    if (text) {
      timeEstimate = Math.ceil(text.length / 200);
    }

    if (url) {
      const data = new FormData();
      data.append("file", url);
      data.append("upload_preset", "devconnector");
      data.append("cloud_name", keys.CLOUD_NAME);
      data.append("folder", "posts");

      axios
        .post(
          `https://api.cloudinary.com/v1_1/${keys.CLOUD_NAME}/image/upload`,
          data
        )
        .then((res) => {
          fetchSave({ ...value, cover: res.data.url, action, timeEstimate });
        })
        .catch((err) => console.log(err));
    } else {
      fetchSave({ ...value, action, timeEstimate });
    }
    handleClose();
    setValue({});
  };

  return savePost.loading ? (
    <Spinner />
  ) : (
    <div className="new">
      <div className="new__header">
        <div className="new__input">
          <div className="new__input--title">
            <input
              type="text"
              autoComplete="false"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="new__input--sub">
            <div className="new__input--tags">
              <Select
                placeholder="Add up to 5 tags ..."
                onChange={handleTypeSelect}
                isClearable
                styles={tagStyles}
                components={{ SingleValue }}
                isSearchable
                isMulti
                closeMenuOnSelect={false}
                name="tags"
                options={value.tags && value.tags.length === 5 ? [] : arr}
                noOptionsMessage={() => {
                  return value.tags && value.tags.length === 5
                    ? "You have reached the max options value"
                    : "No options available";
                }}
              />
            </div>
            <div className="new__input--save">
              <button onClick={handleClick}>
                Publish
                <ExpandMoreIcon />
              </button>
              <StyledMenu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                TransitionComponent={Fade}
              >
                {flag ? (
                  <div>
                    <MenuItem onClick={() => handleSubmit("public")}>
                      Public
                    </MenuItem>
                    <MenuItem onClick={() => handleSubmit("private")}>
                      Private draft
                    </MenuItem>
                  </div>
                ) : (
                  <MenuItem onClick={handleClose}>
                    Add a title, pick up at least a tag and start writing
                    something to publish.
                  </MenuItem>
                )}
              </StyledMenu>
            </div>
          </div>
        </div>
        <div className="new__cover">
          <div className="new__cover--button">
            <button>
              <label htmlFor="cover">Add a cover image</label>
              <input
                id="cover"
                type="file"
                accept="image/*"
                name="cover"
                onChange={handleChange}
              />
            </button>
          </div>
          {url && (
            <img
              className="new__cover--img"
              src={URL.createObjectURL(url)}
              alt=""
            />
          )}
        </div>
      </div>
      <div className="new__edit">
        {toggle ? (
          <Card className="new__edit--card">
            <div
              className="new__preview"
              dangerouslySetInnerHTML={{ __html: getHtml(editorState) }}
            ></div>
          </Card>
        ) : (
          <Edit
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
          />
        )}
        <div className="new__preview--button">
          <button onClick={() => setToggle(!toggle)}>
            {toggle ? <div>Edit</div> : <div>Preview</div>}
          </button>
        </div>
      </div>
    </div>
  );
};
