const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const passport = require("passport");

const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

// Body parse middleware
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

const users = require("./routes/api/users.route");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// Connector to MongoDB
mongoose
  .connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport config
require("./config/passport");

// Use router
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

app.get("/", (req, res) => res.send("Hello world!"));

app.listen(port, () => console.log(`Server running on port ${port}`));