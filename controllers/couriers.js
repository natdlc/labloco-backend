const Courier = require("../models/Courier");

// *EXTRA* Add courier (admin only)
module.exports.addCourier = (input) => {
	let { courierName, price, eta } = input;
	let newCourier = new Courier({ courierName, price, eta });

	return newCourier
		.save()
		.then(() => {
			return { message: "Courier added" };
		})
		.catch((err) => err.message);
};