const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    description: {
      type: String,
      minLength: 1,
      maxLength: 250,
    },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    reactions: [{ type: Schema.Types.ObjectId, ref: "Reaction" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Virtual to get the reaction count
thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactions.length;
  });

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
