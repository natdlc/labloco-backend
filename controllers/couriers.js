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

// *EXTRA* Get couriers (admin only)
module.exports.getCouriers = () => {
	return Courier.find({})
		.then((couriers) => couriers)
		.catch((err) => err.message);
};