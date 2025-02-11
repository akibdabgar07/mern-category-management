const Category = require("../models/Category");
const { updateSubcategories } = require("../services/updateSubcategories");

exports.createCategory = async (req, res) => {
  const { name, parent_category } = req.body;

  try {
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: "Category name already exists" });
    }

    let parentCategoryId = null;

    if (parent_category) {
      const parent = await Category.findOne({ name: parent_category }).lean();

      if (!parent) {
        return res
          .status(400)
          .json({ message: "Invalid parent category name" });
      }
      parentCategoryId = parent._id;
    }

    const category = new Category({
      name,
      parent_category: parentCategoryId,
      status: "active",
    });

    await category.save();

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find(
      {},
      "name status parent_category"
    ).lean();

    if (!categories.length) {
      return res.status(404).json({ message: "No categories found" });
    }

    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat._id] = {
        id: cat._id,
        name: cat.name,
        status: cat.status,
        subCategories: [],
      };
    });

    const categoryList = [];
    categories.forEach((cat) => {
      if (cat?.parent_category) {
        if (categoryMap[cat.parent_category]) {
          categoryMap[cat.parent_category].subCategories.push(
            categoryMap[cat._id]
          );
        }
      } else {
        categoryList.push(categoryMap[cat._id]);
      }
    });

    res
      .status(200)
      .json({ message: "Categories fetched successfully", categoryList });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

exports.updateCategory = async (req, res) => {
  // debugger;
  const { name, status } = req.body;

  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (name) {
      const nameExists = await Category.findOne({ name });
      if (nameExists && nameExists._id.toString() !== req.params.id) {
        return res
          .status(400)
          .json({ message: "Category name already exists" });
      }
      category.name = name;
    }

    if (status) {
      category.status = status;
      await category.save();

      if (status === "inactive") {
        await updateSubcategories(category._id, "inactive");
      }
    }

    res.json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Category.updateMany(
      { parent_category: category._id },
      { parent_category: category.parent_category }
    );
    await category.deleteOne();

    res.json({ message: "Category deleted successfully", id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error", error });
  }
};
