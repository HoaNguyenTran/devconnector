const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  methods: {
    type: [String],
    require: true,
  },

  local: {
    name: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },

  google: {
    name: {
      type: String,
    },
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },

  facebook: {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },

  avatar: {
    type: String,
    require: true,
  },

});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
