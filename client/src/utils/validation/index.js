import validator from "validator";
import isEmpty from "../helper/isEmtpy";
import regex from "../helper/regex";

export function validateBlur(type, data) {
  let errors = {};
  data = isEmpty(data) ? "" : data;

  if (data.length > 200) {
    errors[type] = "Maximum characters: 200";
    return errors;
  } else errors[type] = "";

  if (
    type === "name" ||
    type === "email" ||
    type === "password" ||
    type === "repassword"
  ) {
    if (validator.isEmpty(data)) {
      const str = `${type} field is required`;
      errors[type] = str.charAt(0).toUpperCase() + str.slice(1);
      return errors;
    } else errors[type] = "";
  }

  if (type === "name") {
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
    if (!validator.isEmail(data)) {
      errors.email = "Email is invalid";
      return errors;
    } else errors.email = "";
  }

  if (type === "password") {
    if (!regex.password(data)) {
      errors.password =
        "Password must contain at least 8 characters of which contain at least 1 number, 1 lowercase, 1 uppercase";
      return errors;
    } else errors.password = "";
  }

  if (type === "username") {
    if (validator.isEmpty(data)) {
      errors.username = "Username field is required";
      return errors;
    } else delete errors.username;
  }

  if (type === "color" || type === "bgcolor") {
    if (!/^#([0-9A-F]{3}){1,2}$/i.test(data)) {
      const str = `${type} field is invalid`;
      errors[type] = str.charAt(0).toUpperCase() + str.slice(1);
      return errors;
    } else errors[type] = "";
  }

  if (
    type === "websiteUrl" ||
    type === "employerUrl" ||
    type === "facebook" ||
    type === "twitter" ||
    type === "github" ||
    type === "instagram" ||
    type === "linkedin"
  ) {
    if (!validator.isURL(data) && !validator.isEmpty(data)) {
      const str = `${type} URL field is invalid`;
      errors[type] = str.charAt(0).toUpperCase() + str.slice(1);
      return errors;
    } else errors[type] = "";
  }

  return errors;
}
