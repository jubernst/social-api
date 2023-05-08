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
      const user = await User.findById(req.params.userId)
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
  // POST body: username, email
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a user by id
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
  // delete a user by id
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that id" });
      }

      // remove associated thoughts
      await Thought.deleteMany({
        _id: { $in: user.thoughts },
      });

      res.json({
        message: "User and associated thoughts deleted.",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user || !friend) {
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
        { $pull: { friends: { _id: req.params.friendId } } },
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
};
