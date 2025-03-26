const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    NISN: {
      type: String,
      required: true,
    },
    nama: {
      type: String,
      required: true,
    },
    kelas: {
      type: String,
      required: true,
    },
    no_telp: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
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

const User = mongoose.model("User", UserSchema);

module.exports = User;
