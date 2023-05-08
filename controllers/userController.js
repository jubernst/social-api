const { User, Thought } = require("../models");

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get a single user by id
  async getSingleUser(req, res) {
    try {
      // populate thoughts and friends
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("thoughts")
        .populate("friends");

      if (!user) {
        return res.status(404).json({ message: "No user with that id" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  // POST body:
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that id" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that id" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // remove friend
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: { _id: req.params.userId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that id" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a user and associated thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that id" });
      }

      await Thought.deleteMany({
        _id: { $in: user.thoughts },
      });
      // filter users who have requested user in their friends list
      // await User.updateMany(
      //   { friends: { _id: req.params.userId } },
      //   { $pull: { "friends.$": { _id: req.params.userId } } },
      //   { runValidators: true, new: true }
      // );
      res.json({
        message: "User and associated thoughts deleted.",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
