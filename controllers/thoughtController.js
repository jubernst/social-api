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
      const thought = await Thought.findOne({ _id: req.params.id })
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
        { _id: req.params.id },
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
  // delete a thought and it's reactions
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findAndRemove({ _id: req.params.id });

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
