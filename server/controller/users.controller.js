const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const crypto = require("crypto");
const User = require("../models/User");
const Profile = require("../models/Profile");
const { formatNumber } = require("../../client/src/utils/helper");

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
    subject = "Confirm your email at DevConnector";
    content = `
    <div style="background-color: #f0f0f0; padding-bottom: 8rem">
	<div style="padding: 50px 0 10px 0; font-family: Nunito, sans-serif; font-size: 28px; font-weight: 700; text-align: center; margin-bottom: 1.6rem">DevConnector</div>
	<table align="center" cellpadding="0" cellspacing="0" >
		<tr >
			<td align="center">
				<table align="center" cellpadding="0" cellspacing="0" width="600" style="border-spacing: 2px 5px; padding: 4rem" bgcolor="#fff">
					<tr>
						<td bgcolor="#fff">
							<table cellpadding="0" cellspacing="0" width="100%%">
								<tr>
									<td style="padding: 20px 0 20px 0; font-family: Nunito, sans-serif;">
										<h3 style="margin-bottom: -.5rem">
                    Hi, 
											<span id="name">&#60;${user.local.name}&#62;</span>
										</h3>
										<p style="font-size: 16px; font-weight: 300;margin-bottom: 0">Welcome to Devconnector!</p>
                    ___________________________________
                    
									</td>
								</tr>
								<tr>
									<td style="padding-top: 1rem; font-family: Nunito, sans-serif; font-size: 16px;">
                        Thank you for registering on DevConnector. Please confirm this email to activate your DevConnector account.
                    </td>
								</tr>
								<tr>
									<td style="padding: 20px 0 20px 0; font-family: Nunito, sans-serif; font-size: 16px; text-align: center;">
										<button style="background-color: #3b49df; border: none; border-radius: 8px; color: white; padding: 15px 40px; text-align: center; display: inline-block; font-family: Nunito, sans-serif; font-size: 18px; font-weight: bold; cursor: pointer;">
											<a href="http:\/\/${process.env.domain}\/api\/users\/confirmation\/${user._id}\/${token}" target="_blank" style="color: #fff; text-decoration: none">Confirm Email</a>
										</button>
									</td>
								</tr>
								<tr>
									<td style="padding: 0; font-family: Nunito, sans-serif; font-size: 16px;">
                    If you have trouble clicking the "Confirm Email" button, copy and paste the URL below into your browser:
                    
										<p id="url">&#60;http:\/\/${process.env.domain}/api\/users\/confirmation\/${user._id}\/${token}&#62;</p>
									</td>
								</tr>
								<tr>
									<td style="padding: 50px 100px 16px 0; font-family: Nunito, sans-serif; font-size: 16px;">
										<div style="text-align: right">
											<p style="margin-right: 16px">Regards,</p>
											<p>DevConnector</p>
										</div>
									</td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</div>
              `;
  }
  if (type === "reset") {
    subject = "Reset your password at Devconnector";
    content = `
    <div style="background-color: #f0f0f0; padding-bottom: 8rem">
    <div style="padding: 50px 0 10px 0; font-family: Nunito, sans-serif; font-size: 28px; font-weight: 700; text-align: center; margin-bottom: 1.6rem">DevConnector</div>
    <table align="center" cellpadding="0" cellspacing="0" >
      <tr >
        <td align="center">
          <table align="center" cellpadding="0" cellspacing="0" width="600" style="border-spacing: 2px 5px; padding: 4rem" bgcolor="#fff">
            <tr>
              <td bgcolor="#fff">
                <table cellpadding="0" cellspacing="0" width="100%%">
                  <tr>
                    <td style="padding: 20px 0 20px 0; font-family: Nunito, sans-serif;">
                      <h3 style="margin-bottom: -.5rem">
                      Hi, 
                        <span id="name">&#60;${user.local.name}&#62;</span>
                      </h3>
                      <p style="font-size: 16px; font-weight: 300;margin-bottom: 0">Welcome to Devconnector!</p>
                      ___________________________________
                      
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 1rem; font-family: Nunito, sans-serif; font-size: 16px;">
                          Please confirm this email to reset your password DevConnector account.
                      </td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 0 20px 0; font-family: Nunito, sans-serif; font-size: 16px; text-align: center;">
                      <button style="background-color: #3b49df; border: none; border-radius: 8px; color: white; padding: 15px 30px; text-align: center; display: inline-block; font-family: Nunito, sans-serif; font-size: 18px; font-weight: bold; cursor: pointer;">
                        <a href="http:\/\/${process.env.domain}\/api\/users\/confirmation\/${user._id}\/${token}" target="_blank" style="color: #fff; text-decoration: none">Reset Password</a>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0; font-family: Nunito, sans-serif; font-size: 16px;">
                      If you have trouble clicking the "Reset Password" button, copy and paste the URL below into your browser:
                      
                      <p id="url">&#60;http:\/\/${process.env.domain}/api\/users\/confirmation\/${user._id}\/${token}&#62;</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 50px 100px 16px 0; font-family: Nunito, sans-serif; font-size: 16px;">
                      <div style="text-align: right">
                        <p style="margin-right: 16px">Regards,</p>
                        <p>DevConnector</p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
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

module.exports.signup = (req, res) => {
  const { name, email, password } = req.body;
  let hashPassword = null;

  //mongodb
  User.findOne({ "local.email": email }).then((user) => {
    // if email is exist into database i.e. email is associated with another user.

    if (user)
      return res
        .status(401)
        .json({ msg: "Email already exists. Please log in!" });

    // Bcrypt password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        hashPassword = hash;

        User.findOne({
          $or: [{ "google.email": email }, { "facebook.email": email }],
        })
          .then((foundUser) => {
            // Merge
            if (foundUser) {
              foundUser.methods.push("local");
              foundUser.local = {
                name,
                email,
                password: hashPassword,
                isVerified: false,
              };
              foundUser.save().then((foundUser) => {

                // Generate token
                // const accessToken = signToken(foundUser);
                res.cookie("access_token", accessToken, { httpOnly: true });

                // Send email and token
                const verifyToken = mailToken(foundUser, "verify");
                res.cookie("verify_token", verifyToken, {
                  maxAge: 15 * 60000,
                  httpOnly: true,
                });

                return res.json({ msg: "Success", verifyToken: verifyToken });
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
                const profile = new Profile({
                  username: user._id,
                });

                profile.save(() => {
                  // Generate token
                  const accessToken = signToken(user);
                  // res.cookie("access_token", accessToken, { httpOnly: true });

                  // Send email and token
                  const verifyToken = mailToken(user, "verify");
                  res.cookie("verify_token", verifyToken, {
                    maxAge: 15 * 60000,
                    httpOnly: true,
                  });

                  return res.json({
                    msg: "Success",
                    userId: user._id,
                    verifyToken: verifyToken,
                  });
                });
              });
            }
          })
          .catch((err) => res.status(500).json(err));
      });
    });
  });
};

module.exports.getToken = (req, res) => {
  // console.log(req.cookies);
  
  return res.json({ token: req.cookies });
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
      res.json({ msg: "User has been already verified. Please Sign in!" });
    if (!req.cookies.verify_token === token)
      res.status(400).json({
        msg:
          "Your verification link may have expired. Please click on resend for verify your Email.",
      });
    user.local.isVerified = true;
    user.save().then((user) => {
      if (!user) return res.status(500).json({ msg: err.message });
      // cookies.set('verify_token', {maxAge: 0});
      res.clearCookie("verify_token");
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
        msg: "This account has been already verified. Please signin.",
      });

    // Send email
    const verifyToken = mailToken(user, "verify");
    res.cookie("verify_token", verifyToken, {
      maxAge: 15 * 6000,
      httpOnly: true,
    });
    return res.json({ msg: "Success" });
  });
};

module.exports.signin = (req, res) => {
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
        return res.json({ msg: "Success" });
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
  // Add profile if first signup
  Profile.findOneAndUpdate(
    { username: req.user._id },
    { $set: { username: req.user._id } },
    { new: false, upsert: true }
  ).then(() => {
    // Generate token
    const accessToken = signToken(req.user);
    res.cookie("access_token", accessToken, {
      httpOnly: true,
    });

    return res.json({ msg: "Success" });
  });
};

module.exports.linkGoogle = (req, res) => {
  return res.json({
    success: true,
    methods: req.user.methods,
    message: "Successfully linked account with Google",
  });
};

module.exports.facebookOAuth = (req, res) => {
  // Add profile if first signup
  Profile.findOne({ username: req.user._id }).then(async (profile) => {
    if (!profile) {
      const newProfile = new Profile({
        username: req.user._id,
      });
      await newProfile.save();
    }
    {
      // Generate token
      const accessToken = signToken(req.user);
      res.cookie("access_token", accessToken, {
        httpOnly: true,
      });
      return res.json({ msg: req.user });
    }
  });
};

module.exports.linkFacebook = (req, res) => {
  return res.json({
    success: true,
    methods: req.user.methods,
    message: "Successfully linked account with Google",
  });
};

module.exports.logout = (req, res) => {
  res.clearCookie("access_token");
  return res.json({ success: true });
};

module.exports.current = (req, res) => {
  // Profile.findOne({ username: req.user._id })
  //   .populate("username")
  //   .exec((err, user) => {
  //     if (err) return res.status(500).json({ err });
  //   });
  return res.json(req.user);
};

module.exports.numberOfMembers = (req, res) => {
  User.countDocuments({}, (err, count) => {
    if (err) return res.status(500).json({ err });
    res.json(count);
  });
};
