const { Schema, model } = require("mongoose");
const reaction = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: [280, "You can only use 280 characters"],
    },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: formatDate },
    reactions: [reaction],
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
    hour: "numeric",
    minute: "numeric",
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
