const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require('../utils/jwtUtils.js');


// Simulasi penyimpanan refresh token (gunakan database untuk produksi)
let refreshTokens = [];

// Login User
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not exist" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid password" });

    // Buat Access dan Refresh Token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    

    // Simpan refresh token (gunakan database untuk skala produksi)
    refreshTokens.push(refreshToken);
    

    res.json({ message: "Login berhasil", accessToken, refreshToken });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

// Refresh Token
const refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token || !refreshTokens.includes(token)) {
    return res.status(403).json({ message: "Refresh Token tidak valid" });
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token tidak valid" });

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  });
};

// Logout User
const logoutUser = (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(rt => rt !== token); // Hapus token dari daftar
  res.sendStatus(204); // Sukses tanpa konten
};

// Register User
const registerUser = async (req, res) => {
  const { username, name, email, phone, status, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      name,
      email,
      phone,
      status,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginUser, refreshToken, logoutUser, registerUser };
