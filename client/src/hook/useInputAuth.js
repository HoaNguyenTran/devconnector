import { useState } from "react";
import { validateBlur } from "../utils/validation";

function useInputAuth({ initial, fetchData }) {
  const [value, setValue] = useState(initial);
  const [errors, setErrors] = useState(initial);
  const [vision, setVision] = useState({ password: "off", repassword: "off" });

  const onChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onBlur = (e) => {
    const error = validateBlur(e.target.name, e.target.value);
    setErrors({ ...errors, ...error });
  };

  const onClickVision = (name, status) => {
    let obj = {};
    obj[name] = status;
    setVision({ ...vision, ...obj });
  };

  const onSubmit = (e) => {
    e.preventDefault();
   
    const arr = Object.keys(value);
    let error = {};
    arr.forEach((item) => {
      const err = validateBlur(item, value[item]);
      error[item] = err[item];
    });
    setErrors({ ...errors, ...error });

    if (value.repassword) {
      if (value.password !== value.repassword) {
        setErrors({
          ...errors,
          repassword: "Password and confirm password must match",
        });
        return;
      }
    }

    for (let item in errors) {
      if (errors[item] !== "") return;
    }

    if (JSON.stringify(value) !== JSON.stringify(initial)) {
      if (JSON.stringify(errors) === JSON.stringify(initial)) {
        if (value.email) sessionStorage.setItem("email", value.email);
        fetchData(value);
        return;
      }
    }
    return;
  };

  return {
    value,
    errors,
    vision,
    onClickVision,
    onChange,
    onBlur,
    onSubmit,
  };
}

export default useInputAuth;
