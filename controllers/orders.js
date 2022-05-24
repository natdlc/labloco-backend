const Order = require("../models/Order");
const Product = require("../models/Product");

const calculate = async (total, cart) => {
	for (let i = 0; i < cart.length; i++) {
		await Product.findById(cart[i].productId)
			.then((product) => {
				if (product.isActive) {
					total += product.price * cart[i].quantity;
				} else {
					total = null;
					return total;
				}
			})
			.catch((err) => err.message);
	}
	return total;
};

// Non-admin User checkout (async await)
module.exports.checkout = async (req, res) => {
	if (req.user.isAdmin) {
		return res.send({ message: "Action forbidden" });
	} else {
		let cart = req.body;
		if (cart.length) {
			// for multiple products
			let total = 0;

			let getTotalAmount = await calculate(total, cart);

			if (getTotalAmount) {
				let newOrderDetails = {
					userId: req.user.id,
					totalAmount: getTotalAmount,
				};

				let newOrder = new Order(newOrderDetails);

				cart.forEach((product) => newOrder.products.push(product));

				return newOrder
					.save()
					.then((result) => res.send(result))
					.catch((err) => res.send(err.message));
			} else {
				return Promise.reject({ message: "Can't process order" })
					.then((result) => res.send(result))
					.catch((err) => res.send(err.message));
			}
		} else {
			// for one product
			return Product.findById(cart.productId)
				.then((product) => {
					if (product.isActive === false) {
						return new Promise((resolve, reject) => {
							reject({ message: "Product is not active" });
						});
					} else {
						let total = cart.quantity * product.price;

						let newOrderDetails = {
							userId: req.user.id,
							totalAmount: total,
						};

						let newOrder = new Order(newOrderDetails);

						newOrder.products.push(cart);

						return newOrder
							.save()
							.then((result) => res.send(result))
							.catch((err) => res.send(err.message));
					}
				})
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

/* 

{
    "productId": "628c3adfe84ef0b554c2e7bc",
    "quantity": 5
}

[
    {
        "productId": "628c3adfe84ef0b554c2e7bc",
        "quantity": 3
    },
    {
        "productId": "628c3c0ae84ef0b554c2e7c8",
        "quantity": 5
    },
    {
        "productId": "628c3ad6e84ef0b554c2e7ba",
        "quantity": 2
    }

]

*/
