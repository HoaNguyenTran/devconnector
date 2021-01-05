const validator = require("validator");
const isEmpty = require("../utils/isEmpty");
const regex = require("../utils/regex");

module.exports.register = (req, res, next) => {
    let { name, email, password, repassword } = req.body;
    let errors = {};

    name = isEmpty(name) ? '' : name;
    email = isEmpty(email) ? '' : email;
    password = isEmpty(password) ? '' : password;
    repassword = isEmpty(repassword) ? '' : repassword;

    if(validator.isEmpty(name)) errors.name = "Name field is required";
    if(!regex.name(name)) errors.name = "Name field contain only letters";
    if(!validator.isLength(name, { min: 2, max: 30 })) errors.name = "Name must be between 2 and 30 characters";

    if(validator.isEmpty(email)) errors.email = "Email field is required";
    if(!validator.isEmail(email)) errors.email = "Email is invalid";

    if(validator.isEmpty(password)) errors.password = "Password field is required";
    if(!regex.password(password)) errors.password = "Password must contain at least 8 characters of which contain at least 1 number, 1 lowercase, 1 uppercase";

    if(validator.isEmpty(repassword)) errors.repassword = "Repeat password field required";
    if(!validator.equals(password, repassword)) errors.repassword = "Password and repeat password must match";

    if(!isEmpty(errors)) return res.status(400).json({ errors });

    next();
}

module.exports.login = (req, res, next) => {
    let { email, password } = req.body;
    let errors = {};

    email = isEmpty(email) ? '' : email;
    password = isEmpty(password) ? '' : password;

    if(validator.isEmpty(email)) errors.email = "Email field is required";
    if(!validator.isEmail(email)) errors.email = "Email is invalid";

    if(validator.isEmpty(password)) errors.password = "Password field is required";

    if(!isEmpty(errors)) return res.status(400).json({ errors });
    
    next();
}

module.exports.resetPasswordToken = (req, res, next) => {
    let { password, repassword } = req.body;
    let errors = {};

    password = isEmpty(password) ? '' : password;
    repassword = isEmpty(repassword) ? '' : repassword;

    if(validator.isEmpty(password)) errors.password = "Password field is required";
    if(!regex.password(password)) errors.password = "Password must contain at least 8 characters of which contain at least 1 number, 1 lowercase, 1 uppercase";

    if(validator.isEmpty(repassword)) errors.repassword = "Repeat password field required";
    if(!validator.equals(password, repassword)) errors.repassword = "Password and repeat password must match";

    if(!isEmpty(errors)) return res.status(400).json({ errors });

    next();
}