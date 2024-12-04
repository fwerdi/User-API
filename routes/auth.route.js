const express = require("express");
const { loginUser, refreshToken, logoutUser, registerUser } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post('/refresh', refreshToken);
router.post('/logout', logoutUser);


module.exports = router