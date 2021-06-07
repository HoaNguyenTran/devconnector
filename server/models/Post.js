const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  tags:{
    type: Array,
    required: true,
  },
  cover: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  timeEstimate: {
    type: Number,
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model("Posts", postsSchema);