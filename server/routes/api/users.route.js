const express = require("express");
const router = express.Router();
const passport = require("passport");

const controller = require("../../controller/users.controller");
const validate = require("../../validate/user.validate");

// @route   POST api/users/signup
// @desc    Signup user
// @access  Public
router.post("/signup", validate.signup, controller.signup);

// @route   GET api/users/send_token
// @desc    get token
// @access  Public
router.get("/get-token", controller.getToken);

// @route   GET api/users/confirmation/:_id/:token
// @desc    Verify email
// @access  Public
router.get("/confirmation/:_id/:token", controller.confirmEmail);

// @route   POST api/users/resend
// @desc    Resend user route
// @access  Public
router.post("/resend", controller.resendLink);

// @route   POST api/users/signin
// @desc    signin by local user route
// @access  Public
router.post("/signin", validate.signin, controller.signin);

// @route   POST api/users/resetpassword
// @desc    Reset password
// @access  Public
router.post("/reset-password", controller.resetPassword);

// @route   POST api/users/reset/:token
// @desc    Confirm mail reset
// @access  Public
router.post(
  "/reset-password/:_id/:token",
  validate.resetPasswordToken,
  controller.resetPasswordToken
);

// @route   POST api/users/oauth/google
// @desc    Signin by google account
// @access  Private
router.post(
  "/oauth/google",
  passport.authenticate("google-plus-token", { session: false }),
  controller.googleOAuth
);

// @route   POST api/users/oauth/google/link
// @desc    Link google
// @access  Private
router.post(
  "/oauth/google/link",
  passport.authenticate("jwt", { session: false }),
  passport.authorize("google-plus-token", { session: false }),
  controller.linkGoogle
);

// @route   POST api/users/oauth/facebook
// @desc    Signin by facebook account
// @access  Private
router.post(
  "/oauth/facebook",
  passport.authenticate("facebook-token", { session: false }),
  controller.facebookOAuth
);

// @route   POST api/users/oauth/facebook/link
// @desc    Link facebook
// @access  Private
router.post(
  "/oauth/google/link",
  passport.authenticate("jwt", { session: false }),
  passport.authorize("facebook-token", { session: false }),
  controller.linkFacebook
);

// @route   GET api/users/logout
// @desc    Log out
// @access  Private
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  controller.logout
);

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  controller.current
);

// @route   GET api/users/number_of_members
// @desc    Return number of members
// @access  Public
router.get("/number_of_members", controller.numberOfMembers);

// @route   GET api/users/current
// @desc    Return number of members
// @access  Public

router.get("/", (req, res) => res.json(req.user));

module.exports = router;
