const express = require("express");
const User = require("../models/user.model.js");
const router = express.Router();
const {getUsers, getUser, createUser, updateUser, deleteUser, loginUser, registerUser} = require('../controllers/user.controller.js');


router.get('/', getUsers);
router.get("/:id", getUser);

router.post("/", createUser);

//update a product
router.put("/:id", updateUser);

//delete a product
router.delete("/:id", deleteUser);

router.post("/login", loginUser);
router.post("/register", registerUser); // Jika perlu registrasi

module.exports = router;