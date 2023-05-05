const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
  {
    username: String,
    body: String,
    createdAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Reaction = model("reaction", reactionSchema);

module.exports = Reaction;
