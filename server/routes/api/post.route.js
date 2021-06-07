const express = require("express");
const passport = require("passport");
const router = express.Router()
const post = require("../../controller/post.controller")

router.post("/save-post", passport.authenticate("jwt"), post.savePost);
router.get("/:username/:slug", post.slugPost)
router.post("/full-post", post.fullPost);

module.exports = router;