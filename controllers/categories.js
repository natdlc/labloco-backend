const Category = require("../models/Category");

// *EXTRA* Create a category (admin only)
module.exports.createCategory = (categoryName) => {
	let newCategoryDetails = {
		name: categoryName,
	};

	let newCategory = new Category(newCategoryDetails);
	return newCategory
		.save()
		.then(() => {
			return { message: "Category added successfully" };
		})
		.catch((err) => err.message);
};
