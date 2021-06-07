const express = require("express");
const router = express.Router();
const passport = require("passport");

const controller = require("../../controller/users.controller");
const validate = require("../../validate/user.validate");

// @route   GET api/users/number_of_members
// @desc    Return number of members
// @access  Public
router.get("/number-of-members", controller.numberOfMembers);

// @route   POST api/users/signup
// @desc    Signup user
// @access  Public
router.post("/signup", validate.signup, controller.signup);

// @route   GET api/users/send_token
// @desc    get token
// @access  Public
router.get("/get-token/:_id/:token", controller.getToken);

// @route   GET api/users/confirm-email/:_id/:token
// @desc    Verify email
// @access  Public
router.get("/confirm-email/:id/:token", controller.confirmEmail);

// @route   GET api/users/resend-email
// @desc    Resend email user route
// @access  Public
router.get("/resend-email/:id", controller.resendEmail);

// @route   POST api/users/signin
// @desc    signin by local user route
// @access  Public
router.post("/signin", validate.signin, controller.signin);

// @route   POST api/users/resetpassword
// @desc    Reset password
// @access  Public
router.post(
  "/forgot-password",
  validate.forgotPassword,
  controller.forgotPassword
);

// @route   POST api/users/reset/:token
// @desc    Confirm mail reset
// @access  Public
router.post(
  "/reset-password/:id/:token",
  validate.resetPassword,
  controller.resetPassword
);

// @route   GET api/users/oauth/google
// @desc    Signin by google account
// @access  Public
router.get(
  "/oauth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// @route   GET api/users/oauth/google/callback
// @desc    Get data return
// @access  Public

router.get(
  "/oauth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000/auth/signin", session: false }),
  controller.googleOAuth
);

// @route   GET api/users/oauth/google/link
// @desc    Link google
// @access  Private
router.get(
  "/oauth/google/link",
  passport.authenticate("jwt", { session: false }),
  passport.authorize("google", { scope: ["profile", "email"] }),
  controller.linkGoogle
);

// @route   GET api/users/oauth/google/unlink
// @desc    Unlink google
// @access  Private
router.get(
  "/oauth/google/unlink",
  passport.authenticate("jwt", { session: false }),
  controller.unlinkGoogle
);

// @route   GET api/users/oauth/facebook
// @desc    Signin by facebook account
// @access  Private
router.get(
  "/oauth/facebook",
  passport.authenticate("facebook", { scope : ['email']})
);

// @route   GET api/users/oauth/facebook/callback
// @desc    Get data return
// @access  Public

router.get(
  "/oauth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "http://localhost:3000/auth/signin", session: false }),
  controller.facebookOAuth
);

// @route   GET api/users/oauth/facebook/link
// @desc    Link facebook
// @access  Private
router.get(
  "/oauth/facebook/link",
  passport.authenticate("jwt", { session: false }),
  passport.authorize("facebook", { session: false }),
  controller.linkFacebook
);

// @route   GET api/users/oauth/facebook/unlink
// @desc    Unlink facebook
// @access  Private
router.get(
  "/oauth/facebook/unlink",
  passport.authenticate("jwt", { session: false }),
  controller.unlinkFacebook
);

// @route   DELETE api/users/remove/account
// @desc    Remove account
// @access  Private
router.delete(
  "/remove/account",
  passport.authenticate("jwt", { session: false }),
  controller.removeAccount
);

// @route   GET api/users/signout
// @desc    Signout
// @access  Private
router.get(
  "/signout",
  controller.signout
);

// @route   GET api/users/check-auth
// @desc    Return current user
// @access  Private
router.get(
  "/check-auth",
  passport.authenticate("jwt", { session: false }),
  controller.checkAuth
);

// @route   GET api/users/current
// @desc    Return number of members
// @access  Public

module.exports = router;
