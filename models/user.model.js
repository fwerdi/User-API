const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter product "],
    },

    name: {
      type: String,
      required: true,
      default: 0,
    },

    email: {
      type: String,
      required: true,
      default: 0,
    },

    phone: {
      type: String,
      required: true,
      default: 0,
    },

    status: {
      type: Boolean,
      required: false,
      default: 0,
    },

    password: {
      type: String,
      required: true,
      default: 0,
    },

    profileImage: {
      type: String,
      required: false,
      default: null, 
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
