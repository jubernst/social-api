const { Schema, model } = require("mongoose");

// Users have thoughts, friend (other users)
// id, username, email, friendcount, _v?
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: [6, "username too short"],
      max: [12, "username too long"],
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        },
      },
      required: true,
    },
    friends: [Schema.Types.ObjectId],
    thoughts: [],
    friendCount: Number,
    __v: Number, // no idea what this is for
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const User = model("user", userSchema);

module.exports = User;
