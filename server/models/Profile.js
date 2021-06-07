const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create schema
const ProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  name: {
    type: Schema.Types.String,
  },
  email: {
    type: Schema.Types.String,
  },
  username: {
    type: String,
  },
  avatar: {
    type: String,
  },

  displayEmail: {
    type: Boolean,
  },
  websiteUrl: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  color: {
    type: String,
  },

  available: {
    type: String,
  },
  learning: {
    type: String,
  },
  skills: {
    type: String,
  },
  hacking: {
    type: String,
  },

  recruiterContact: {
    type: Boolean,
  },
  employerTitle: {
    type: String,
  },
  employerName: {
    type: String,
  },
  education: {
    type: String,
  },
  employerUrl: {
    type: String,
  },

  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  github: {
    type: String,
  },
  instagram: {
    type: String,
  },
  linkedin: {
    type: String,
  },

  repo: [],

  followTag: [],

  dateJoin: { type: Date, default: Date.now },
});

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
