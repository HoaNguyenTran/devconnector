const regex = require("../utils/regex");
const validator = require("validator");

module.exports.setInfo = (req, res, next) => {
  let { name, username } = req.body;
  if (validator.isEmpty(name)) errors.name = "Name field is required";
  if (!regex.name(name)) errors.name = "Name field contain only letters";
  if (!validator.isLength(name, { min: 2, max: 30 }))
    errors.name = "Name must be between 2 and 30 characters";

  if (validator.isEmpty(username)) errors.name = "User name field is required";
  next();
};
