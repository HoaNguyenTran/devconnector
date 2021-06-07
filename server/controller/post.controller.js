const Post = require("../models/Post");
const slugify = require("slugify");
const { nanoid } = require("nanoid");
const Profile = require("../models/Profile");

module.exports = {
  savePost: async (req, res) => {
    try {
      const { title, tags, cover, content, action, timeEstimate } = req.body;

      const profile = await Profile.findOne({ userId: req.user.id });

      if (!profile) {
        return res.status(400).json({ msg: "User not found" });
      }

      const slug = `${slugify(title.toLowerCase())}_${nanoid(3)}`;

      const post = new Post({
        userId: req.user.id,
        username: profile.username,
        name: profile.name,
        avatar: profile.avatar,
        title,
        slug,
        tags,
        cover,
        content,
        action,
        timeEstimate,
      });

      post.save().then((newPost) => {
        if (!newPost) return res.status(400).json({ msg: "Something wrong" });
        return res.json({ slug: `/${profile.username}/${slug}` });
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  slugPost: async (req, res) => {
    try {
      const { username, slug } = req.params;

      const postMain = await Post.find(
        { username, slug },
        {
          tags: 1,
          title: 1,
          slug: 1,
          content: 1,
          action: 1,
          timeEstimate: 1,
          createdAt: 1,
          updatedAt: 1,
          cover: 1,
        }
      );
      if (!postMain) return res.status(400).json({ msg: "Something wrong" });

      const postSub = await Post.find(
        {
          username,
          slug: { $not: { $eq: slug } },
        },
        {
          title: 1,
          tags: 1,
          slug: 1,
          _id: 0,
        }
      )
        .sort({ _id: -1 })
        .limit(3);
      if (!postSub) return res.status(400).json({ msg: "Something wrong" });

      Profile.find(
        { username },
        {
          name: 1,
          username: 1,
          avatar: 1,
          dateJoin: 1,
          bio: 1,
          color: 1,
          employerTitle: 1,
          employerName: 1,
          employerUrl: 1,
          education: 1,
          location: 1,
          _id: 0,
        }
      ).then((profile) => {
        if (!profile) return res.status(400).json({ msg: "Something wrong" });

        const data = {
          postMain,
          postSub,
          profile,
        };

        return res.json(data);
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  fullPost: async (req, res) => {
    try {
      const post = await Post.find(
        {},
        { username: 1, name: 1, avatar: 1, createdAt: 1, updatedAt: 1, cover: 1, title: 1, tags: 1, slug: 1, timeEstimate: 1 }
      )
        .limit(7)
        .skip(req.body.skip);

      res.json(post)
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
