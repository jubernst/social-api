const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single thought by it's id
  async getSingleThought(req, res) {
    try {
      // populate reactions
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select("-__v")
        .populate("reactions");

      if (!thought) {
        return res.status(404).json({ message: "No thoughts with that id" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought with associated user
  // POST body: thoughtText, username
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      // Link thought to user
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought created, but found no user with that username",
        });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a thought by it's id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thoughts with that id" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a thought by it's id
  async deleteThought(req, res) {
    try {
      // Delete thought
      const thought = await Thought.findAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thoughts with that id" });
      }

      // remove thought from user
      await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      res.json({
        message: "Thought deleted.",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add a reaction to a thought
  // POST body: reactionBody
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thoughts with that id" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a reaction to a thought by reactionId
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thoughts with that id" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
