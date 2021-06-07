const express = require("express");
const router = express.Router();
const passport = require("passport");
const profile = require("../../controller/profile.controller");
const validate = require("../../validate/profile.validate")

// @route   POST api/profile/full-info
// @desc    Return full information 
// @access  Public
router.post("/full-info", profile.fullInfo);

// @route   POST api/profile/author
// @desc    Return 
// @access  Private
router.post("/author-route", passport.authenticate("jwt"), profile.authorRoute);


// @route   GET api/profile/full-info
// @desc    Return full information 
// @access  Private
router.get("/full-info", passport.authenticate("jwt"), profile.fullInfo);

// @route   POST api/profile/set-info
// @desc    Return 
// @access  Private
router.post("/set-info", passport.authenticate("jwt"), validate.setInfo, profile.setInfo);

// @route   POST api/profile/get-repo
// @desc    Return 
// @access  Private
router.post("/get-repo", passport.authenticate("jwt"), profile.getRepo);

// @route   POST api/profile/select-repo
// @desc    Return 
// @access  Private
router.post("/select-repo", passport.authenticate("jwt"), profile.selectRepo);

module.exports = router;