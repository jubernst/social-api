const { User, Thought, Reaction } = require("../models");

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
      // populate thoughts and friends
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
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought created, but found no user with that ID",
        });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a thought
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
  // add a reaction to a thought
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
  // delete a reaction to a thought
  async removeReaction(req, res) {
    try {
      // Remove reaction from thought
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
  // delete a thought
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
};
