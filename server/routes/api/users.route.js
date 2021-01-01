const express = require("express");
const router = express.Router();
const passport = require("passport");

const controller = require("../../controller/users.controller");
const validate = require("../../validate/user.validate");

// @route   POST api/users/register
// @desc    Register user route
// @access  Public
router.post("/register", validate.register, controller.register);

// @route   GET api/users/confirmation/:token
// @desc    Verify email
// @access  Public
router.get("/confirmation/:token", controller.confirmEmail);

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
  "/reset-password/:token",
  validate.resetPasswordToken,
  controller.resetPasswordToken
);

// @route   GET api/users/oauth/google
// @desc    Login by google account
// @access  Public
// router.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );
// @route   GET api/users/oauth/google/callback
// @desc    Login by google account
// @access  Public

// router.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });
// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google"),
//   (req, res) => {
//     res.send(req.user);
//     res.send("you reached the redirect URI");
//   }
// );

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  controller.current
);

module.exports = router;
