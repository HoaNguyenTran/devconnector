import axios from "axios";
import keys from "../config/keys";

const { useState, useEffect } = require("react");
const { useDispatch, useSelector } = require("react-redux");

const { fetchSetInfo } = require("../redux/actions/profile.action");
const { validateBlur } = require("../utils/validation");

function useInputEdit() {
  const {full} = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  const fetchSet = (data) => dispatch(fetchSetInfo(data));

  const [value, setValue] = useState({});
  const [obj, setObj] = useState({});
  const [errors, setErrors] = useState({});
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [flag, setFlag] = useState("");

  useEffect(() => {
    if (
      (!full.loading && full.data) ||
      (!full.loading && full.error)
    ) {
      if (full.data) {
        setValue(full.data);
        setObj(full.data);
      }
    }
  }, [full]);

  const onChange = (e) => {
    setFlag("true");
    if (
      e.target.name === "displayEmail" ||
      e.target.name === "recruiterContact"
    ) {
      setValue({ ...value, [e.target.name]: e.target.checked });
    } else if (e.target.name === "avatar") {
      setUrl(e.target.files[0]);
      setFile(URL.createObjectURL(e.target.files[0]));
    } else setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onBlur = (e) => {
    const error = validateBlur(e.target.name, e.target.value);
    setErrors({ ...errors, ...error });
  };

  const isUrl = () => {
    
    if (url) {
      const data = new FormData();
      data.append("file", url);
      data.append("upload_preset", "devconnector");
      data.append("cloud_name", keys.CLOUD_NAME);
      data.append("folder", "avatar");

      axios
        .post(
          `https://api.cloudinary.com/v1_1/${keys.CLOUD_NAME}/image/upload`,
          data
        )
        .then((res) => {
          fetchSet({ ...value, avatar: res.data.url });
        })
        .catch((err) => console.log(err));
    } else {
      fetchSet(value);
    }
    setFlag(false)
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (JSON.stringify(obj) !== JSON.stringify(value) || file) {
      for (let item in errors) {
        if(errors[item] !== "") return;
      }
      isUrl();
    }
    
  };

  return {
    obj,
    file,
    url,
    value,
    errors,
    flag,
    onBlur,
    onChange,
    onSubmit,
  };
}

export default useInputEdit;
