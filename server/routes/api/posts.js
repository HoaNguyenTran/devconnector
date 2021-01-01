const express = require("express");
const router = express.Router();

// @route GET api/posts/
// @desc 
// Public

router.get("/", (req, res) => res.json({ msg: ""} ));

module.exports = router;