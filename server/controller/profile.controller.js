const Profile = require("../models/Profile");
const Post = require("../models/Post");

const profile = {
  fullInfo: async (req, res) => {
    try {
      let profile = null;

      if (req.body.username) {
        const { username } = req.body;
        profile = await Profile.findOne({ username }).lean();
      } else if (req.user) {
        profile = await Profile.findOne({ userId: req.user._id }).lean();
      } else {
        return res.status(400).json({ msg: "Error" });
      }
      if (!profile) res.status(400).json({ msg: "Profile does not exist" });
      profile.post = await Post.find({ userId: profile.userId });

      return res.json(profile);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  authorRoute: async (req, res) => {
    try {
      const { username } = req.body;

      const profile = await Profile.findOne({ username });

      if (!profile) return res.json(false);

      if (String(profile.userId) !== String(req.user._id))
        return res.status(400).json({ msg: "This is not the author!" });

      return res.json(true);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  setInfo: async (req, res) => {
    try {
      const data = req.body;
      const existProfile = await Profile.findOne({ userId: req.user._id });
      if (!existProfile)
        return res.status(400).json({ msg: "User does not exist" });

      if (/\s/g.test(data.username))
        return res
          .status(400)
          .json({ msg: "User name does not contain white space" });

      if (String(existProfile.username) !== String(data.username)) {
        const existName = await Profile.findOne({ username: data.username });
        if (existName)
          return res.status(400).json({ msg: "Username does exist" });
        else
          await Post.updateMany(
            { userId: data.userId },
            { username: data.username }
          );
      }

      const profile = await Profile.findOneAndUpdate(
        { userId: req.user._id },
        data
      );

      if (!profile)
        return res.status(400).json({ msg: "Profile does not exist!" });

      return res.json(profile);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getRepo: async (req, res) => {
    try {
      const data = req.body;
      const profile = await Profile.findOneAndUpdate(
        { userId: req.user._id },
        { repo: data }
      );

      if (!profile) res.status(400).json({ msg: "Profile does not exist!" });

      return res.json(data);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  selectRepo: (req, res) => {
    try {
      const data = req.body;

      Profile.findOne({ userId: req.user._id }).then(async (profile) => {
        if (!profile) res.status(400).json({ msg: "Profile does not exist!" });

        profile.repo.forEach((item, index) => {
          if (item.id === data.id) {
            profile.repo[index].status = data.status;
          }
        });

        await Profile.findOneAndUpdate({ userId: req.user._id }, profile);
        return res.json(profile.repo);
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = profile;
