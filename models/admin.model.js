const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter Nomor Induk "],
    },

    password: {
      type: String,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
