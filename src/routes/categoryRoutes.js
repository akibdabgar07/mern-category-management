const express = require("express");
const AuthGuard = require("../middleware/authMiddleware");
const validate = require("../utils/validator.util");
const schema = require("../validations/category.validation");

const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.post("/", AuthGuard, validate(schema.createCategory), createCategory);
router.get("/", AuthGuard, getCategories);
router.put("/:id", AuthGuard, validate(schema.updateCategory), updateCategory);
router.delete("/:id", AuthGuard, deleteCategory);

module.exports = router;
