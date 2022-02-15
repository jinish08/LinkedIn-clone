const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = bcrypt.genSalt(10);
        req.body.password = bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).send("You are not allowed to update this user");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted succesfully");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).send("You are not allowed to delete this user");
  }
});

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.following.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username,desc, profilePicture } = friend;
      friendList.push({ _id, username,desc, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//newfriends
router.get("/newfriends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const all = await User.find();
    const y = all.filter((genuser) => {
      return genuser.username !== user.username;
    });
    const newfriends = y.filter((genuser) => {
      return !user.following.includes(genuser._id);
    });
    let newfriendList = [];
    newfriends.map((newfriend) => {
      const { _id, username,desc, profilePicture } = newfriend;
      newfriendList.push({ _id, username,desc, profilePicture });
    });
    res.status(200).json(newfriendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json("You are now following this user");
      } else {
        return res.status(403).send("You are already following this user");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).send("You can't follow yourself");
  }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json("You unfollowed this user");
      } else {
        return res.status(403).send("You are already do not follow this user");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).send("You can't unfollow yourself");
  }
});

module.exports = router;
