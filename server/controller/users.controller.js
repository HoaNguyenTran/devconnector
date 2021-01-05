const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const crypto = require("crypto");
const User = require("../models/User");

signToken = (user) => {
  return jwt.sign(
    {
      iss: "DevConnector",
      sub: user._id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1), // current time + 1 day ahead
    },
    process.env.secretOrKey
  );
};

mailToken = (user, type) => {
  // Generate mail token
  const token = crypto.randomBytes(16).toString("hex");
  // Send email use nodemailer
  let content = null,
    subject = null;
  // Config mail server
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.adminEmail,
      pass: process.env.adminPassword,
    },
  });

  // Content mail
  if (type === "verify") {
    subject = "Account Verification Link";
    content = `
              <table align="center" cellpadding="0" cellspacing="0" width="95%">
              <tr>
                  <td align="center">
                  <table align="center" cellpadding="0" cellspacing="0" width="600" style="border-spacing: 2px 5px;" bgcolor="#fff">
                      <tr>
                      <td bgcolor="#fff">
                          <table cellpadding="0" cellspacing="0" width="100%%">
                          <tr>
                              <td style="padding: 10px 0 10px 0; font-family: Nunito, sans-serif; font-size: 20px; font-weight: 900">
                              Activate your DevConnector account
                              </td>
                          </tr>
                          </table>
                      </td>
                      </tr>
                      <tr>
                      <td bgcolor="#fff">
                          <table cellpadding="0" cellspacing="0" width="100%%">
                          <tr>
                              <td style="padding: 20px 0 20px 0; font-family: Nunito, sans-serif; font-size: 16px;">
                              Hi, <span id="name">&#60;${user.local.name}&#62;</span>
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 0; font-family: Nunito, sans-serif; font-size: 16px;">
                                  Thank you for registering on DevConnector. Please confirm this email to activate your DevConnector account.
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 20px 0 20px 0; font-family: Nunito, sans-serif; font-size: 16px; text-align: center;">
                              <button style="background-color: #e04420; border: none; color: white; padding: 15px 40px; text-align: center; display: inline-block; font-family: Nunito, sans-serif; font-size: 18px; font-weight: bold; cursor: pointer;">
                                  <a href="http:\/\/localhost:5000\/api\/users\/confirmation\/${user._id}\/${token}" target="_blank">Confirm Email</a>
                              </button>
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 0; font-family: Nunito, sans-serif; font-size: 16px;">
                              If you have trouble clicking the "Confirm Email" button, copy and paste the URL below into your browser:
                              <p id="url">&#60;http:\/\/localhost:5000\/api\/users\/confirmation\/${user._id}\/${token}&#62;</p>
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 50px 0; font-family: Nunito, sans-serif; font-size: 16px;">
                              Regards,
                              <p>DevConnector</p>
                              </td>
                          </tr>
                          </table>
                      </td>
                      </tr>
                  </table>
                  </td>
              </tr>
              </table>
              `;
  }
  if (type === "reset") {
    subject = "Reset Password Link";
    content = `
              <table align="center" cellpadding="0" cellspacing="0" width="95%">
              <tr>
                  <td align="center">
                  <table align="center" cellpadding="0" cellspacing="0" width="600" style="border-spacing: 2px 5px;" bgcolor="#fff">
                      <tr>
                      <td bgcolor="#fff">
                          <table cellpadding="0" cellspacing="0" width="100%%">
                          <tr>
                              <td style="padding: 10px 0 10px 0; font-family: Nunito, sans-serif; font-size: 20px; font-weight: 900">
                              Reset your password DevConnector account
                              </td>
                          </tr>
                          </table>
                      </td>
                      </tr>
                      <tr>
                      <td bgcolor="#fff">
                          <table cellpadding="0" cellspacing="0" width="100%%">
                          <tr>
                              <td style="padding: 20px 0 20px 0; font-family: Nunito, sans-serif; font-size: 16px;">
                              Hi, <span id="name">&#60;${user.local.name}&#62;</span>
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 0; font-family: Nunito, sans-serif; font-size: 16px;">
                                  Please confirm this email to reset your password DevConnector account.
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 20px 0 20px 0; font-family: Nunito, sans-serif; font-size: 16px; text-align: center;">
                              <button style="background-color: #e04420; border: none; color: white; padding: 15px 40px; text-align: center; display: inline-block; font-family: Nunito, sans-serif; font-size: 18px; font-weight: bold; cursor: pointer;">
                                  <a href="http:\/\/localhost:5000\/api\/users\/reset-password\/${user._id}\/${token}" target="_blank">Reset password</a>
                              </button>
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 0; font-family: Nunito, sans-serif; font-size: 16px;">
                              If you have trouble clicking the "Confirm Email" button, copy and paste the URL below into your browser:
                              <p id="url">&#60;http:\/\/localhost:5000\/api\/users\/reset_password\/${user._id}\/${token}&#62;</p>
                              </td>
                          </tr>
                          <tr>
                              <td style="padding: 50px 0; font-family: Nunito, sans-serif; font-size: 16px;">
                              Regards,
                              <p>DevConnector</p>
                              </td>
                          </tr>
                          </table>
                      </td>
                      </tr>
                  </table>
                  </td>
              </tr>
              </table>
              `;
  }

  // Option email
  const options = {
    from: process.env.adminEmail,
    to: user.local.email,
    subject: subject,
    html: content,
  };

  // Send
  transporter.sendMail(options, (err, info) => {
    if (err) return res.status(500).json({ msg: err });
    res.json({ msg: "Message sent: " + info.response });
  });

  return token;
};

module.exports.register = (req, res) => {
  const { name, email, password } = req.body;
  let hashPassword = null,
    token = null;

  //mongodb
  User.findOne({ "local.email": email }).then((user) => {
    // if email is exist into database i.e. email is associated with another user.
    if (user)
      return res
        .status(400)
        .json({ msg: "Email already exists. Please log in!" });

    // Bcrypt password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        hashPassword = hash;

        User.findOne({
          $or: [{ "google.email": email }, { "facebook.email": email }],
        }).then((foundUser) => {
          // Merge
          if (foundUser) {
            foundUser.methods.push("local");
            foundUser.local = { name, email, password: hashPassword, isVerified: false };
            foundUser.save().then((foundUser) => {
              // Generate token
              const accessToken = signToken(foundUser);
              res.cookie("access_token", accessToken, { httpOnly: true });

              // Send email and token
              const verifyToken = mailToken(foundUser, "verify");
              res.cookie("verify_token", verifyToken, { maxAge: 15*6000, httpOnly: true });
              return res.json({ success: true });
            });
          }

          // Create a new user
          else {
            const newUser = new User({
              methods: ["local"],
              local: {
                name,
                email,
                password: hashPassword,
              },
            });

            // Save
            newUser.save().then((user) => {
              // Generate token
              const accessToken = signToken(user);
              res.cookie("access_token", accessToken, { httpOnly: true });

              // Send email and token
              const verifyToken = mailToken(user, "verify");
              res.cookie("verify_token", verifyToken, { maxAge: 15*6000, httpOnly: true });

              return res.json({ msg: "Success" });
            });
          }
        });
      });
    });
  });
};

module.exports.confirmEmail = (req, res) => {
  const { _id, token } = req.params;
  User.findOne({ _id }).then((user) => {
    if (!user)
      res.status(400).json({
        msg:
          "We were unable to find a user for this verification. Please Sign Up!",
      });
    if (user.local.isVerified)
      res.json({ msg: "User has been already verified. Please Login!" });
    if (!req.cookies === token)
      res.status(400).json({
        msg:
          "Your verification link may have expired. Please click on resend for verify your Email.",
      });
    user.local.isVerified = true;
    user.save().then((user) => {
      if (!user) return res.status(500).json({ msg: err.message });
      return res.json({ msg: "Your account has been successfully verified" });
    });
  });
};

module.exports.resendLink = (req, res) => {
  User.findOne({ "local.email": req.body.email }).then((user) => {
    // Check exist user and virified
    if (!user)
      return res.status(400).json({
        msg:
          "We were unable to find a user with that email. Make sure your Email is correct!",
      });
    if (user.local.isVerified)
      return res.json({
        msg: "This account has been already verified. Please login.",
      });

    // Send email
    const verifyToken = mailToken(user, "verify");
    res.cookie("verify_token", verifyToken, { maxAge: 15*6000, httpOnly: true });
    return res.json({ msg: success });
  });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ "local.email": email })
    .then((user) => {
      // user is not found in database i.e. user is not registered yet.
      if (!user)
        return res.status(401).json({
          msg: `The email address ${email} is not associated with any account. Please check and try again!`,
        });

      // Compare password
      bcrypt.compare(password, user.local.password, (err, result) => {
        if (!result) return res.status(400).json({ msg: "Password incorrect" });
        // Check verify email
        if (!user.local.isVerified)
          return res.status(401).json({
            msg: "Your Email has not been verified. Please click on resend",
          });

        // Generate token
        const accessToken = signToken(user);
        res.cookie("access_token", accessToken, { httpOnly: true });
        return res.json({ msg: "success" });
      });
    })
    .catch((err) => res.status(500).json({ err }));
};

module.exports.resetPassword = (req, res) => {
  User.findOne({ "local.email": req.body.email }).then((user) => {
    // User is not found in database i.e. user is not registered yet.
    if (!user)
      return res.status(401).json({
        msg: `The email address ${req.body.email} is not associated with any account. Please check and try again!`,
      });

    // Check reset passowrd
    if (!user.local.isVerified) {
      return res.status(401).json({
        msg: `Your Email has not been verified. Please click on resend`,
      });
    }

    // Reset password
    const verifyToken = mailToken(user, "reset");
    res.cookie("reset_token", verifyToken, { httpOnly: true });
    return res.json({ msg: "Success" });
  });
};

module.exports.resetPasswordToken = (req, res) => {
  // Compare
  if (!req.cookies.reset_token === req.params.token) {
    return res.status(400).json({
      msg:
        "Your reset link may have expired. Please click on reset your Email.",
    });
  }

  // Reset password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt).then((hash) => {
      User.findOneAndUpdate({ _id: req.params._id }, { password: hash }).then(
        (user) => {
          if (!user)
            return res.status(401).json({
              msg:
                "We were unable to find a user for this verification. Please Sign Up!",
            });
          return res.json({
            msg: "Your account has been successfully change password",
          });
        }
      );
    });
  });
};

module.exports.googleOAuth = (req, res) => {
  // Generate token
  const accessToken = signToken(req.user);
  res.cookie("access_token", accessToken, {
    httpOnly: true,
  });
  res.json({ success: true });
};

module.exports.linkGoogle = (req, res) => {
  res.json({ 
    success: true,
    methods: req.user.methods, 
    message: 'Successfully linked account with Google' 
  });
}

module.exports.facebookOAuth = (req, res) => {
  // Generate token
  const accessToken = signToken(req.user);
  res.cookie("access_token", accessToken, {
    httpOnly: true,
  });
  res.json({ msg: req.user });
};

module.exports.linkFacebook = (req, res) => {
  res.json({ 
    success: true,
    methods: req.user.methods, 
    message: 'Successfully linked account with Google' 
  });
}

module.exports.logout = (req, res) => {
  res.clearCookie('access_token');
  return res.json({ success: true });
};


module.exports.current = (req, res) => {
  return res.json(req.user);
};
