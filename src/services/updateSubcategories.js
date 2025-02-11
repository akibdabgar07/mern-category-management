const Category = require("../models/Category");

const updateSubcategories = async (parentId, newStatus) => {
  const subcategories = await Category.find({ parent_category: parentId });
  // console.log("akib calling......");

  if (subcategories.length > 0) {
    await Category.updateMany(
      { parent_category: parentId },
      { status: newStatus }
    );
    for (const subcategory of subcategories) {
      await updateSubcategories(subcategory._id, newStatus);
    }
  }
};

module.exports = { updateSubcategories };
