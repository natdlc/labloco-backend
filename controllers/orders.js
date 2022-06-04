const Order = require("../models/Order");
const Product = require("../models/Product");
const Discount = require("../models/Discount");
const Courier = require("../models/Courier");
const User = require("../models/User");

const getCourier = async (courierId) => {
	return await Courier.findById(courierId).then((courier) => {
		return {
			courierId: courier._id,
			price: courier.price,
		};
	});
};

const clearCart = (userId, cart) => {
	return User.findByIdAndUpdate(userId, { cart: [] })
		.then((result) => {
			return { message: "cart cleared" };
		})
		.catch((err) => err.message);
};

const getCart = (userId) => {
	return User.findById(userId)
		.then((user) => {
			return user.cart;
		})
		.catch((err) => err.message);
};

const calculateTotal = async (total, cart) => {
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

const updateDatabase = async (
	cart,
	newOrder,
	res,
	discount,
	userId,
	courierId
) => {
	cart.forEach((product) => newOrder.products.push(product));
	if (discount) {
		let newDiscount = {
			discountId: discount._id,
			percentage: discount.percentage,
			amount: discount.amount,
		};
		newOrder.discount.push(newDiscount);
	}

	newOrder.courier.push({courierId});

	await clearCart(userId, cart);

	return newOrder
		.save()
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
};

const createOrder = (req, totalAmount) => {
	let newOrderDetails = {
		userId: req.user.id,
		paymentMethod: req.body.paymentMethod,
		comments: req.body.comments,
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
		let cart = await getCart(req.user.id);
		let discountId = req.params.discountId;
		let total = 0;

		let totalAmount = await calculateTotal(total, cart);
		// if all products valid
		if (totalAmount) {
			// if discount id is provided
			const courier = await getCourier(req.body.courierId);
			totalAmount += courier.price;
			if (discountId) {
				let discount = await getDiscount(discountId, res);
				// if discount is valid
				if (discount) {
					// if discount is percentage-based instead of fixed amount
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
				let newOrder = createOrder(req, totalAmount);
				return updateDatabase(
					cart,
					newOrder,
					res,
					discount,
					req.user.id,
					courier.courierId
				);
			} else {
				let newOrder = createOrder(req, totalAmount);
				return updateDatabase(
					cart,
					newOrder,
					res,
					discountId,
					req.user.id,
					courier.courierId
				);
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
