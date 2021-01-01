const express = require("express");
const router = express.Router();

// @route GET api/profile/
// @desc 
// Public

router.get("/", (req, res) => res.json({ msg: ""} ));

module.exports = router;