const User = require("../models/user.model");
const bcrypt = require("bcrypt");


const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).json({ message: "Invalid password" });
  
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const registerUser = async (req, res) => {
    const { username, name, email, phone, status, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, name, email, phone, status, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = { loginUser, registerUser };
