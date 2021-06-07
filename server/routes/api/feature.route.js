const express = require("express");
const passport = require("passport");
const feature = require("../../controller/feature.controller");
const router = express.Router();

router.post("/add-tag", passport.authenticate("jwt"), feature.addTag);
router.get("/get-tag", feature.getTag);
router.post("/follow-tag", passport.authenticate("jwt"), feature.followTag);


module.exports = router;