const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema({
  username: String,
  body: String,
  createdAt: { type: Date, default: Date.now },
  reactions: [Schema.Types.ObjectId],
  reactionCount: Number,
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
