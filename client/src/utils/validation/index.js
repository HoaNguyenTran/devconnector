import validator from "validator";
import isEmpty from "../helper/isEmtpy";
import regex from "../helper/regex";

export function valBlurSignup(type, data) {
  let errors = {};
  data = isEmpty(data) ? "" : data;

  if (type === "name") {
    if (validator.isEmpty(data)) {
      errors.name = "Name field is required";
      return errors;
    }
    if (!regex.name(data)) {
      errors.name = "Name field contain only letters";
      return errors;
    }
    if (!validator.isLength(data, { min: 2, max: 30 })) {
      errors.name = "Name must be between 2 and 30 characters";
      return errors;
    } else errors.name = "";
  }
  if (type === "email") {
    if (validator.isEmpty(data)) {
      errors.email = "Email field is required";
      return errors;
    }

    if (!validator.isEmail(data)) {
      errors.email = "Email is invalid";
      return errors;
    } else errors.email = "";
  }

  if (type === "password") {
    if (validator.isEmpty(data)) {
      errors.password = "Password field required";
      return errors;
    }
    if (!regex.password(data)) {
      errors.password =
        "Password must contain at least 8 characters of which contain at least 1 number, 1 lowercase, 1 uppercase";
      return errors;
    } else errors.password = "";
  }

  if (type === "repassword") {
    if (validator.isEmpty(data)) {
      errors.repassword = "Repeat password field required";
      return errors;
    } else errors.repassword = "";
  }

  return errors;
}
