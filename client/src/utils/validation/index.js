import validator from "validator";
import isEmpty from "../helper/isEmtpy";
import regex from "../helper/regex";

export function valChangeSignup(type, data) {
  let errors = {};
  data = isEmpty(data) ? "" : data;

  if (type === "name") {
    if (!regex.name(data)) errors.name = "Name field contain only letters";
    if (!validator.isLength(data, { min: 2, max: 30 }))
      errors.name = "Name must be between 2 and 30 characters";
    else
        errors.name = "";
  }
  if (type === "email") {
    if (!validator.isEmail(data)) errors.email = "Email is invalid";
    else
        errors.email = "";
  }

  if (type === "password") {
    if (!regex.password(data))
      errors.password =
        "Password must contain at least 8 characters of which contain at least 1 number, 1 lowercase, 1 uppercase";
        else
        errors.password = "";
  }

  if (type === "repassword") {
    if (validator.isEmpty(data))
      errors.repassword = "Repeat password field required";
    else
    errors.repassword = "";
  }

  return errors;
}
