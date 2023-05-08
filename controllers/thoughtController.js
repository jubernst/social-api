const { Thought, Reaction } = require("../models");

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
  // create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
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
      // create the reaction
      const reaction = await Reaction.create(req.body);
      // add reaction to thought
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: reaction._id } },
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
        { $pull: { reactions: { _id: req.body.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thoughts with that id" });
      }

      // Delete reaction
      await Reaction.findByIdAndDelete(req.body.reactionId);

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a thought and it's reactions
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No thoughts with that id" });
      }

      await Reaction.deleteMany({
        _id: { $in: thought.reactions },
      });

      res.json({
        message: "Thought and associated reactions deleted.",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
