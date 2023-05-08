const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

const thoughtSchema = new Schema(
  {
    username: String,
    body: String,
    postedBy: { type: Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    reactions: [Reaction],
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
