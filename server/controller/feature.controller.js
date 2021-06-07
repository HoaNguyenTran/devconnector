const Profile = require("../models/Profile");
const Tag = require("../models/Tag");

module.exports = {
  addTag: async (req, res) => {
    try {
      const { name, description, image, color, bgcolor } = req.body;

      Tag.findOne({ name }).then((tag) => {
        if (tag) return res.status(400).json({ msg: "Already exist tag" });
      });

      const newTag = new Tag({
        name: name.toLowerCase(),
        description,
        image,
        color,
        bgcolor,
      });
      const result = await newTag.save();
      if (!result) return res.status(400).json({ msg: "Something wrong" });

      return res.json({ msg: "Add new tag success" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getTag: async (req, res) => {
    try {
      Tag.find({}).exec((err, tag) => {
        if (err) return res.status(400).json({ msg: error.message });
        if (tag) {
          return res.json(tag);
        }
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  followTag: async (req, res) => {
    try {
      const { name, status, action } = req.body;
      Profile.findOne({ userId: req.user.id }).then(async (profile) => {
        if (!profile)
          return res.status(400).json({ msg: "Profile does not exist" });
        if (action) {
          return res.json(profile.followTag);
        }
        if (status) {
          if (profile.followTag.includes(name))
            return res.status(400).json({ msg: "Tag have followed" });
          profile.followTag.push(name);
          await profile.save();
          res.json(profile.followTag);
        } else {
          if (!profile.followTag.includes(name))
            return res.status(400).json({ msg: "Tag have not followed" });
          const index = profile.followTag.indexOf(name);
          profile.followTag.splice(index, 1);
          await profile.save();
          res.json(profile.followTag);
        }
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
