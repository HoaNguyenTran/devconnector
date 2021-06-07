const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const crypto = require("crypto");
const User = require("../models/User");
const Profile = require("../models/Profile");

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
    service: "Gmail",
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
				<table align="center" cellpadding="0" cellspacing="0" width="800" style="border-spacing: 2px 5px; padding: 4rem" bgcolor="#fff">
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
											<a href="http:\/\/localhost:3000\/auth\/confirm-email\/${user._id}\/${token}" target="_blank" style="color: #fff;">Confirm Email</a>
										</button>
									</td>
								</tr>
								<tr>
									<td style="padding: 0; font-family: Nunito, sans-serif; font-size: 16px;">
                    If you have trouble clicking the "Confirm Email" button, copy and paste the URL below into your browser:
                    
										<p id="url">&#60;http:\/\/localhost:3000\/auth\/confirm-email\/${user._id}\/${token}&#62;</p>
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
                        <a href="http:\/\/localhost:3000\/auth\/reset-password\/${user._id}\/${token}" target="_blank" style="color: #fff;">Reset Password</a>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0; font-family: Nunito, sans-serif; font-size: 16px;">
                      If you have trouble clicking the "Reset Password" button, copy and paste the URL below into your browser:
                      
                      <p id="url">&#60;http:\/\/localhost:3000\/auth\/reset-password\/${user._id}\/${token}&#62;</p>
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
  transporter.sendMail(options, function(error, info){
    if (error) {
      console.log(error);
    }
  });
  return token;
};

module.exports.numberOfMembers = (req, res) => {
  User.countDocuments({}, (err, count) => {
    if (err) return res.status(500).json({ err });
    return res.json(count);
  });
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
        .json({ msg: "Email already exist. Please log in!" });

    // Bcrypt password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
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
                // Send email and token
                const verifyToken = mailToken(foundUser, "verify");
                res.cookie("verify_token", verifyToken, {
                  maxAge: 15 * 60000,
                  httpOnly: false,
                  secure: false,
                });

                return res.json({
                  userId: foundUser._id,
                  verifyToken: verifyToken,
                });
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
                const verifyToken = mailToken(user, "verify");
                const profile = new Profile({
                  userId: user._id,
                  name: user[user.methods[0]].name,
                  email: user[user.methods[0]].email,
                  username: user._id.toString(),
                  avatar: `https://ui-avatars.com/api/?background=random&size=32&name=${user[
                    user.methods[0]
                  ].name
                    .toString()
                    .toUpperCase()
                    .charAt(0)}`,
                });

                profile.save(() => {
                  return res.json({
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
  return res.json({ token: req.cookies.verify_token });
};

module.exports.confirmEmail = (req, res) => {
  const { id, token } = req.params;
  // Check params valid
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(500).json({ msg: "Link invalid, please check again!" });
  }
  User.findById(id).then((user) => {
    if (!user)
      return res.status(401).json({
        msg:
          "We were unable to find a user for this verification. Please Sign Up!",
      });
    if (user.local.isVerified)
      return res
        .status(400)
        .json({ msg: "User has been already verified. Please Sign In!" });
    if (!req.cookies.verify_token === token)
      return res.status(400).json({
        msg:
          "Your verification link may have expired. Please click on resend for verify your Email.",
      });
    user.local.isVerified = true;
    user.save().then((user) => {
      if (!user) return res.status(500).json({ msg: "Save failed" });
      res.clearCookie("verify_token");
      // Generate token
      const accessToken = signToken(user);
      res.cookie("access_token", accessToken, {
        httpOnly: false,
        secure: false,
        maxAge: 86400000,
      });
      return res.json({ msg: "Your account has been successfully verified" });
    });
  });
};

module.exports.resendEmail = (req, res) => {
  User.findById(req.params.id).then((user) => {
    if (!user)
      return res
        .status(400)
        .json({ msg: "The id user could not be found. Please sign up!" });
    if (!user.local)
      return res.status(400).json({
        msg: "The account has not linked the original email. Please sign up!",
      });
    if (user.local.isVerified)
      return res.status(400).json({
        msg: "This account has been already verified. Please sign in!",
      });

    // Send email
    const verifyToken = mailToken(user, "verify");
    res.cookie("verify_token", verifyToken, {
      maxAge: 15 * 60000,
      httpOnly: false,
      secure: false,
    });
    return res.json({ token: req.cookies.verify_token });
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
        res.cookie("access_token", accessToken, {
          httpOnly: false,
          secure: false,
          maxAge: 86400000,
        });
        return res.json({ msg: "Success" });
      });
    })
    .catch((err) => res.status(500).json({ err }));
};

module.exports.forgotPassword = (req, res) => {
  User.findOne({ "local.email": req.body.email }).then((user) => {
    // User is not found in database i.e. user is not registered yet.
    if (!user)
      return res.status(401).json({
        msg: `The email address is not associated with any account. Please check and try again!`,
      });

    // Check reset passowrd
    if (!user.local.isVerified) {
      return res.status(401).json({
        msg: `Your Email has not been verified. Please click on resend`,
      });
    }

    // Reset password
    const resetToken = mailToken(user, "reset");
    res.cookie("reset_token", resetToken, { httpOnly: false, secure: false });
    return res.json({ userId: user._id, resetToken });
  });
};

module.exports.resetPassword = (req, res) => {
  const { id, token } = req.params;
  // Check params valid
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(500).json({ msg: "Link invalid, please check again!" });
  }

  // Compare
  if (!req.cookies.reset_token === token) {
    return res.status(400).json({
      msg:
        "Your reset link may have expired. Please click on reset your Email.",
    });
  }

  // Reset password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      if (err) throw err;
      User.findOneAndUpdate({ _id: id }, { "local.password": hash }).then(
        (user) => {
          if (!user)
            return res.status(401).json({
              msg:
                "We were unable to find a user for this verification. Please Sign Up!",
            });
          res.clearCookie("reset_token");
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
  Profile.findOne({ username: req.user._id }).then(async (profile) => {
    const { name, email } = req.user[req.user.methods[0]];
    if (!profile) {
      const newProfile = new Profile({
        userId: req.user._id,
        name,
        email,
        username: req.user._id.toString(),
        avatar: `https://ui-avatars.com/api/?background=random&size=32&name=${name
          .toString()
          .toUpperCase()
          .charAt(0)}`,
      });
      await newProfile.save();
    }
    {
      // Generate token
      const accessToken = signToken(req.user);
      res.cookie("access_token", accessToken, {
        httpOnly: false,
        secure: false,
        maxAge: 86400000,
      });
      return res.redirect("http://localhost:3000/");
    }
  });
};

module.exports.linkGoogle = (req, res) => {
  return res.json({
    success: true,
    methods: req.user.methods,
    message: "Successfully linked account with Google",
  });
};

module.exports.unlinkGoogle = (req, res) => {
  try {
    User.findOne({ _id: req.user._id }).then(async (user) => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      if (!user.methods.includes("google"))
        return res.status(400).json({ msg: "User have not google account" });

      if (user.methods.length > 1) {
        user = user.toObject();
        user.methods.splice([user.methods.indexOf("google")], 1);
        delete user.google || delete user["google"];
        await User.replaceOne({ _id: req.user._id }, user);
      } else {
        await user.remove();
        res.clearCookie("access_token");

        Profile.findOne({userId: req.user._id}).then(async profile => {
          if(!profile) return res.status(400).json({ msg: "Profile does not exist" });
          await profile.remove();
        })
      }

      return res.json({ msg: "Remove google account success" });
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.facebookOAuth = (req, res) => {
  // Add profile if first signup
  Profile.findOne({ username: req.user._id }).then(async (profile) => {
    const { name, email } = req.user[req.user.methods[0]];
    if (!profile) {
      const newProfile = new Profile({
        userId: req.user._id,
        name,
        email,
        username: req.user._id.toString(),
        avatar: `https://ui-avatars.com/api/?background=random&size=32&name=${name
          .toString()
          .toUpperCase()
          .charAt(0)}`,
      });
      await newProfile.save();
    }
    {
      // Generate token
      const accessToken = signToken(req.user);
      res.cookie("access_token", accessToken, {
        httpOnly: false,
        secure: false,
        maxAge: 86400000,
      });
      return res.redirect("http://localhost:3000/");
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

module.exports.unlinkFacebook = (req, res) => {
  try {
    User.findOne({ _id: req.user._id }).then(async (user) => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      if (!user.methods.includes("facebook"))
        return res.status(400).json({ msg: "User have not facebook account" });

      if (user.methods.length > 1) {
        user = user.toObject();
        user.methods.splice([user.methods.indexOf("facebook")], 1);
        delete user.facebook || delete user["facebook"];
        await User.replaceOne({ _id: req.user._id }, user);
      } else {
        await user.remove();
        res.clearCookie("access_token");
        Profile.findOne({ userId: req.user._id }).then(async (profile) => {
          if (!profile)
            return res.status(400).json({ msg: "Profile does not exist" });
          await profile.remove();
        });
      }

      return res.json({ msg: "Remove facebook account success" });
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.removeAccount = (req, res) => {
  try {
    User.findOne({ _id: req.user._id }).then(async (user) => {
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      await user.remove();
      res.clearCookie("access_token");

      Profile.findOne({ userId: req.user._id }).then(async (profile) => {
        if (!profile)
          return res.status(400).json({ msg: "Profile does not exist" });
        await profile.remove();

        return res.json({ msg: "Remove account success" });
      });
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports.signout = (req, res) => {
  res.clearCookie("access_token");
  return res.json({ msg: "Success" });
};

module.exports.checkAuth = (req, res) => {
  return res.json(req.user);
};
