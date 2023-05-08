const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: { type: String, required: true, maxlength: 5 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: formatDate },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
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

module.exports = reactionSchema;
