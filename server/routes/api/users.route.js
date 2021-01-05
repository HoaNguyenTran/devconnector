const express = require("express");
const router = express.Router();
const passport = require("passport");

const controller = require("../../controller/users.controller");
const validate = require("../../validate/user.validate");
router.get("/register", (req, res) => res.send("helelo"));
// @route   POST api/users/register
// @desc    Register user route
// @access  Public
router.post("/register", validate.register, controller.register);

// @route   GET api/users/confirmation/:_id/:token
// @desc    Verify email
// @access  Public
router.get("/confirmation/:_id/:token", controller.confirmEmail);

// @route   POST api/users/resend
// @desc    Resend user route
// @access  Public
router.post("/resend", controller.resendLink);

// @route   POST api/users/login
// @desc    Login by local user route
// @access  Public
router.post("/login", validate.login, controller.login);

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
// @desc    Login by google account
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
// @desc    Login by facebook account
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

// @route   GET api/users/current
// @desc    Return current user
// @access  Private

router.get("/test", (req, res) => res.json(req.user));

module.exports = router;
