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

// *EXTRA* Retrieve active categories
module.exports.getActiveCategories = () => {
	return Category.find({ isActive: true })
		.then((result) => result)
		.catch((err) => err.message);
};

// *EXTRA* Retrieve all categories (admin only)
module.exports.getAllCategories = () => {
	return Category.find()
		.then((result) => result)
		.catch((err) => err.message);
};

// *EXTRA* Edit category name (admin only)
module.exports.editCategory = (categoryId, newName) => {
	return Category.findByIdAndUpdate(categoryId, { name: newName })
		.then(() => {
			return { message: "Category name updated" };
		})
		.catch((err) => err.message);
};

// *EXTRA* Archive a category (admin only)
module.exports.archiveCategory = (categoryId) => {
	return Category.findByIdAndUpdate(categoryId, { isActive: false })
		.then(() => {
			return { message: "Category archived" };
		})
		.catch((err) => err.message);
};

// *EXTRA* Delete a category (admin only)
module.exports.deleteCategory = async (categoryId) => {
	let productExists = await Category.findById(categoryId)
		.then((category) => {
			if (category.products.length) {
				return true;
			} else {
				return false;
			}
		})
		.catch((err) => err.message);
	if (productExists) {
		return { message: "Can't delete category linked to products" };
	} else {
		return Category.findByIdAndRemove(categoryId)
			.then(() => {
				return { message: "Category removed" };
			})
			.catch((err) => err.message);
	}
};