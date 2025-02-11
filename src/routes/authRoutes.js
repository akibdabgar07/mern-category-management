const express = require("express");
const { check } = require("express-validator");
const { registerUser } = require("../controllers/authController");
const { loginUser } = require("../controllers/authController");
const Validate = require("../utils/validator.util");
const schema = require("../validations/auth.validation");

const router = express.Router();

// Register Route
router.post("/register", Validate(schema.register), registerUser);

// Login Route
router.post("/login", Validate(schema.login), loginUser);

module.exports = router;
