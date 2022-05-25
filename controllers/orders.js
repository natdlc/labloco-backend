const Order = require("../models/Order");
const Product = require("../models/Product");
const Discount = require("../models/Discount");

const calculate = async (total, cart) => {
	for (let i = 0; i < cart.length; i++) {
		await Product.findById(cart[i].productId)
			.then((product) => {
				if (product.isActive) {
					total += product.price * cart[i].quantity;
				} else {
					total = NaN;
					return total;
				}
			})
			.catch((err) => err.message);
	}
	return total;
};

const updateDatabase = (cart, newOrder, res, discount) => {
	cart.forEach((product) => newOrder.products.push(product));
	if (discount) {
		let newDiscount = {
			discountId: discount._id,
			percentage: discount.percentage,
			amount: discount.amount,
		};
		newOrder.discount.push(newDiscount);
	}

	return newOrder
		.save()
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
};

const createOrder = (req, totalAmount) => {
	let newOrderDetails = {
		userId: req.user.id,
		totalAmount,
	};

	let newOrder = new Order(newOrderDetails);

	return newOrder;
};

const getDiscount = (discountId, res) => {
	return Discount.findById(discountId)
		.then((discount) => {
			if (discount.isActive) {
				return discount;
			} else {
				return false;
			}
		})
		.catch((err) => err.message);
};

// Non-admin User checkout
module.exports.checkout = async (req, res) => {
	if (req.user.isAdmin) {
		return res.send({ message: "Action forbidden" });
	} else {
		let cart = req.body;
		let discountId = cart[cart.length - 1].discountId;
		let total = 0;

		let totalAmount = await calculate(total, cart);
		console.log(totalAmount);
		if (totalAmount) {
			if (discountId) {
				let discount = await getDiscount(discountId, res);
				if (discount) {
					if (discount.percentage) {
						totalAmount =
							totalAmount - totalAmount * (discount.percentage / 100);
					} else {
						totalAmount = totalAmount - discount.amount;
					}
				} else {
					return res.send({
						message: "Error: discount invalid",
					});
				}

				cart.pop();

				let newOrder = createOrder(req, totalAmount);

				return updateDatabase(cart, newOrder, res, discount);
			} else {
				let newOrder = createOrder(req, totalAmount);
				return updateDatabase(cart, newOrder, res);
			}
		} else {
			return Promise.reject({ message: "Can't process order" })
				.then((result) => res.send(result))
				.catch((err) => res.send(err.message));
		}
	}
};

// Retrieve all orders (Admin only)
module.exports.getAllOrders = async (req, res) => {
	return Order.find({})
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
};
