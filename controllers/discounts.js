const Discount = require("../models/Discount");

// Create discount (admin only)
module.exports.createDiscount = (discountInfo) => {
	let newDiscount = new Discount(discountInfo);

	return newDiscount
		.save()
		.then(() => {return {message:"discount created"}})
		.catch((err) => err.message);
};

// Retrieve discounts (admin only)
module.exports.getDiscounts = () => {
	return Discount.find({})
		.then((result) => result)
		.catch((err) => err.message);
};

// Update discount to inactive (admin only)
module.exports.deactivateDiscount = (discountId) => {
	return Discount.findByIdAndUpdate(discountId, { isActive: false })
		.then((result) => {
			return { message: "SUCCESS: Discount deactivated" };
		})
		.catch((err) => err.message);
};

// Update discount to active (admin only)
module.exports.activateDiscount = (discountId) => {
	return Discount.findByIdAndUpdate(discountId, { isActive: true })
		.then((result) => {
			return { message: "SUCCESS: Discount activated" };
		})
		.catch((err) => err.message);
};
