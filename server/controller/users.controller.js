const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const crypto = require("crypto");
const User = require("../models/User");
const Token = require("../models/Token");

module.exports.register = (req, res) => {
  const { name, email, password, avatar } = req.body;

  User.findOne({ email }).then((user) => {
    // if email is exist into database i.e. email is associated with another user.
    if (user) return res.status(400).json({ msg: "Email already exists. Please log in!" });

    // Bcrypt password generator
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        const newUser = new User({
          name,
          email,
          password: hash,
          avatar,
        });

        // Save new user
        newUser
          .save()
          .then((user) => {
            const { _id, name, email, avatar } = user;

            // Generate token and save
            const newToken = new Token({
              _userId: _id,
              token: crypto.randomBytes(16).toString("hex"),
            });

            newToken.save((err) => {
              if (err) return res.status(500).json({ msg: err });

              // Send email use nodemailer

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
              const content = `
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
                                Hi, <span id="name">&#60;${name}&#62;</span>
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
                                    <a href="http:\/\/${req.headers.host}\/api\/users\/confirmation\/${newToken.token}" target="_blank">Confirm Email</a>
                                </button>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0; font-family: Nunito, sans-serif; font-size: 16px;">
                                If you have trouble clicking the "Confirm Email" button, copy and paste the URL below into your browser:
                                <p id="url">&#60;http:\/\/${req.headers.host}\/confirmation\/${newToken.token}&#62;</p>
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

              // Option email
              const options = {
                from: process.env.adminEmail,
                to: email,
                subject: "Account Verification Link",
                html: content,
              };

              // Send
              transporter.sendMail(options, (err, info) => {
                if (err) return res.status(500).json({ msg: err });
                res.json({ msg: "Message sent: " + info.response });
              });
            });

            // payload jwt
            const payload = {
              _id,
              name,
              email,
              avatar,
            };

            // Sign Token
            jwt.sign(
              payload,
              process.env.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                // error occur
                if (err) return res.status(500).send({ msg: err.message });

                return res.json({ success: true, token: "Bearer " + token });
              }
            );
          })
          .catch((err) => console.log(err));
      });
    });
  });
};

module.exports.confirmEmail = (req, res) => {
  Token.findOne({ token: req.params.token }).then((token) => {
    if (!token)
      return res.status(400).json({
        msg:
          "Your verification link may have expired. Please click on resend for verify your Email.",
      });

    User.findOne({ _id: token._userId }).then((user) => {
      if (!user)
        return res.status(401).json({
          msg:
            "We were unable to find a user for this verification. Please Sign Up!",
        });
      else if (user.isVerified)
        return res
          .status(200)
          .json("User has been already verified. Please Login");
      else {
        user.isVerified = true;
        user.save().then((user) => {
          if (!user) return res.status(500).json({ msg: err.message });
          return res
            .status(200)
            .json({ msg: "Your account has been successfully verified" });
        });
      }
    });
  });
};

module.exports.resendLink = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      // User not found into database
      if (!user)
        return res.status(400).json({
          msg:
            "We were unable to find a user with that email. Make sure your Email is correct!",
        });
      // User has been already verified
      else if (user.isVerified)
        return res.status(200).json({
          msg: "This account has been already verified. Please login.",
        });
      // Send verified link
      else {
        // Create token
        const newToken = {
          _userId: user._id,
          token: crypto.randomBytes(16).toString("hex"),
        };

        newToken.save((err) => {
          if (err) return res.status(500).json({ msg: err });

          // Send email use nodemailer

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
          const content = `
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
                                  Hi, <span id="name">&#60;${user.name}&#62;</span>
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
                                      <a href="http:\/\/${req.headers.host}\/api\/users\/confirmation\/${newToken.token}" target="_blank">Confirm Email</a>
                                  </button>
                                  </td>
                              </tr>
                              <tr>
                                  <td style="padding: 0; font-family: Nunito, sans-serif; font-size: 16px;">
                                  If you have trouble clicking the "Confirm Email" button, copy and paste the URL below into your browser:
                                  <p id="url">&#60;http:\/\/${req.headers.host}\/api\/users\/confirmation\/${newToken.token}&#62;</p>
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

          // Option email
          const options = {
            from: process.env.adminEmail,
            to: email,
            subject: "Account Verification Link",
            html: content,
          };

          // Send
          transporter.sendMail(options, (err, info) => {
            if (err) return res.status(500).json({ msg: err });
            res.json({ msg: "Message sent: " + info.response });
          });
        });
      }
    })
    .catch((err) => res.status(500).json({ err }));
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      // user is not found in database i.e. user is not registered yet.
      if (!user)
        return res.status(401).json({
          msg: `The email address ${email} is not associated with any account. Please check and try again!`,
        });

      const { _id, name, avatar } = user;
      // Compare password
      bcrypt.compare(password, user.password, (err, result) => {
        if (!result) return res.status(400).json({ msg: "Password incorrect" });
        // Check verify email
        else if (!user.isVerified)
          return res.status(401).json({
            msg: "Your Email has not been verified. Please click on resend",
          });

        // Json web token

        // Create payload
        const payload = {
          _id,
          name,
          email,
          avatar,
        };

        // Sign Token
        jwt.sign(
          payload,
          process.env.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            // error occur
            if (err) return res.status(500).send({ msg: err.message });
            return res
              .status(200)
              .json({ success: true, token: "Bearer " + token });
          }
        );
      });
    })
    .catch((err) => res.status(500).json({ err }));
};

module.exports.resetPassword = (req, res) => {
  const { email } = req.body;

  User.findOne({ email }).then((user) => {
    // User is not found in database i.e. user is not registered yet.
    if (!user)
      return res.status(401).json({
        msg: `The email address ${email} is not associated with any account. Please check and try again!`,
      });
    // Check reset passowrd
    else if (!user.isVerified) {
      return res.status(401).json({
        msg: `Your Email has not been verified. Please click on resend`,
      });
    }

    // Reset password
    else {
      // Create token
      const newToken = new Token({
        _userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });

      newToken.save((err) => {
        if (err) return res.status(500).json({ msg: err });

        // Send email use nodemailer

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
        const content = `
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
                                  Hi, <span id="name">&#60;${user.name}&#62;</span>
                                  </td>
                              </tr>
                              <tr>
                                  <td style="padding: 20px 0 20px 0; font-family: Nunito, sans-serif; font-size: 16px; text-align: center;">
                                  <button style="background-color: #e04420; border: none; color: white; padding: 15px 40px; text-align: center; display: inline-block; font-family: Nunito, sans-serif; font-size: 18px; font-weight: bold; cursor: pointer;">
                                      <a href="http:\/\/${req.headers.host}\/api\/users\/reset-password\/${newToken.token}" target="_blank">Reset Password</a>
                                  </button>
                                  </td>
                              </tr>
                              <tr>
                                  <td style="padding: 0; font-family: Nunito, sans-serif; font-size: 16px;">
                                  If you have trouble clicking the "Reset Password" button, copy and paste the URL below into your browser:
                                  <p id="url">&#60;http:\/\/${req.headers.host}\/api\/users\/reset-password\/${newToken.token}&#62;</p>
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

        // Option email
        const options = {
          from: process.env.adminEmail,
          to: email,
          subject: "Reset Password Link",
          html: content,
        };

        // Send
        transporter.sendMail(options, (err, info) => {
          if (err) return res.status(500).json({ msg: err });
          res.json({ msg: "Token: " + newToken.token });
        });
      });
    }
  });
};

module.exports.resetPasswordToken = (req, res) => {
  const { password } = req.body;
  Token.findOne({ token: req.params.token }).then((token) => {
    if (!token)
      return res.status(400).json({
        msg:
          "Your reset link may have expired. Please click on reset your Email.",
      });

    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(password, salt).then((hash) => {
        User.findOneAndUpdate({ _id: token._userId }, { password: hash }).then(
          (user) => {
            if (!user)
              return res.status(401).json({
                msg:
                  "We were unable to find a user for this verification. Please Sign Up!",
              });

            return res.status(200).json({
              msg:
                "Your account has been successfully change password: "
            });
          }
        );
      });
    });
  });
};

module.exports.current = (req, res) => {
  return res.json(req.user);
};

