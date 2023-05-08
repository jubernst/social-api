const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: [4, "Username too short"],
      maxlength: [12, "Username too long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        // Use regex to validate the email
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
    thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
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
