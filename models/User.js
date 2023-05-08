const { Schema, model } = require("mongoose");
const Thought = require("./Thought");

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
      required: true,
      validate: {
        // Use regex to validate the email
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        },
      },
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    thoughts: [Thought],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Virtual to get the friend count
userSchema
  .virtual("friendCount")
  // Getter
  .get(function () {
    return this.friends.length;
  });

const User = model("user", userSchema);

module.exports = User;
