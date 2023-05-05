const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

const thoughtSchema = new Schema(
  {
    username: String,
    body: String,
    createdAt: { type: Date, default: Date.now },
    reactions: [Reaction],
    reactionCount: Number,
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactions.length;
  });

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
