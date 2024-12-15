const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");
const upload = require('../config/multer.config.js');
const bcrypt = require('bcrypt');


// const getUsers = async (req, res) => {
//   try {
//     const users = await User.find().limit(2);
//     console.log(users.length);
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; 
    const search = req.query.search || ""; 

    const skip = (page - 1) * limit;

    
    const filter = search
      ? {
          $or: [
            { email: { $regex: search, $options: 'i' } }, 
            { username: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } },
            { name: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const users = await User.find(filter).limit(limit).skip(skip);

    const total = await User.countDocuments(filter);

    res.status(200).json({
      page,
      limit,
      total,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
   
    const { password, ...otherDetails } = req.body;

    
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    
    const userData = { ...otherDetails, password: hashedPassword };

    
    const user = await User.create(userData);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePassword = async (req, res) => {
  try{
    const { email, oldPassword, newPassword } = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(404).json({ message: "Email not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Password lama salah' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password berhasil diubah' });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const uploadUser = async (req, res) => {
  try {
    const filePath = req.file.path;
    const userId = req.body.userId;

    const user = await User.findByIdAndUpdate(userId, { profileImage: filePath }, { new: true });

    res.status(200).json({
      message: 'Profile image uploaded successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updatePassword,
  deleteUser,
  uploadUser,
};
