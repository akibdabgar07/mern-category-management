const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1, user_name: 1 });

module.exports = mongoose.model("User", UserSchema);
