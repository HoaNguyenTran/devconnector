const mongoose = require("mongoose");


const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  color: {
      type: String,
      default: "#FFFFFF",
  },
  bgcolor: {
      type: String,
      default: "#000000",
  },
  countPost: {
      type: Number,
      default: 0
  },
  isFollow: {
    type: Boolean,
    default: false
  }
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;