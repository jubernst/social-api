const { User, Thought, Reaction } = require("../models");

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
      const user = await User.findOne({ _id: req.params.id }).select("-__v");
      // want to get the users thoughts as well

      if (!user) {
        return res.status(404).json({ message: "No user with that id" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
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
  // add and remove friends ..?
  async addFriend(req, res){
    try {
        const user = await User.findOneAndUpdate({_id: req.params.userId}, {$addTo})
    }
  },
  // delete a user and associated thoughts + reactions
  // should also delete from friend lists, and subtract from friendcount
  async deleteUser(req, res) {
    try {
      const user = await User.findAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that id" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      // filter users who have requested user in their friends
      // the array is made of ids
      await User.updateMany({friends: user});
      res.json({
        message: "User and associated thoughts deleted. ",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
