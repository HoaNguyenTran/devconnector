const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");

const app = express();
const port = process.env.PORT || 5000;

const users = require("./routes/api/users.route");
const profile = require("./routes/api/profile.route");
const feature = require("./routes/api/feature.route");
const post = require("./routes/api/post.route");

require("dotenv").config();

// Connector to MongoDB
mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false)
mongoose.set("useCreateIndex", true);

app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use(cookieParser());
app.use(fileupload());

app.use(passport.initialize());
app.use(passport.session())
require("./config/passport");

// Use router
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/feature", feature);
app.use("/api/post", post);

app.listen(port, () => console.log(`Server running on port ${port}`));
