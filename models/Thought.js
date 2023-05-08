const { Schema, model } = require("mongoose");
// may need to import reactionSchema

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: formatDate },
    reactions: [{ type: Schema.Types.ObjectId, ref: "Reaction" }],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

function formatDate(date) {
  return date.toLocaleString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Virtual to get the reaction count
thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return this.reactions.length;
  });

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
