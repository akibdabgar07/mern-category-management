const Joi = require("joi");
const mongoose = require("mongoose");

// Custom validation to check if `parent_category` is a valid ObjectId or null
const objectIdValidator = (value, helpers) => {
  if (!value) return null; // Allow null values (for root categories)
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid parent_category ID");
  }
  return value;
};

module.exports = {
  createCategory: Joi.object({
    name: Joi.string().min(3).max(50).required(),
    parent_category: Joi.alternatives().try(
      Joi.string().custom(objectIdValidator),
      Joi.allow(null)
    ),
    status: Joi.string().valid("active", "inactive").default("active"),
  }),

  updateCategory: Joi.object({
    name: Joi.string().min(3).max(50).optional(),
    parent_category: Joi.alternatives()
      .try(Joi.string().custom(objectIdValidator), Joi.allow(null))
      .optional(),
    status: Joi.string().valid("active", "inactive").optional(),
  }),
};
