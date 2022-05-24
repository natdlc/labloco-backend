const Order = require("../models/Order");
const Product = require("../models/Product");

//checks if product is active
const isProductActive = (isActive) => {
	if (isActive) {
		return product;
	} else {
		return new Promise((resolve, reject) => {
			reject({ message: "Product is not active" });
		});
	}
};

// Non-admin User checkout (async await)
module.exports.checkout = async (req, res) => {
	if (req.user.isAdmin) {
		return res.send({ message: "Action forbidden" });
    } else {
		let cart = req.body;
		let subtotals = [];
        if (cart.length) { // for multiple products
			for (let i = 0; i < cart.length; i++) {
				let product = await Product.findById(cart[i].productId)
					.then((product) => {
						return isProductActive(product.isActive);
					})
					.catch((err) => err.message);
				subtotals.push(product.price * cart[i].quantity);
            };

			let total = subtotals.reduce((p, c) => p + c, 0);

			let newOrderDetails = {
				userId: req.user.id,
				totalAmount: total,
			};

			let newOrder = new Order(newOrderDetails);

			cart.forEach((product) => {
				newOrder.products.push(product);
			});

			return newOrder
				.save()
				.then((result) => res.send(result))
                .catch((err) => res.send(err.message));
            
		} else { // for one product
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
    "productId": "628b734c8780922d348d1026",
    "quantity": 5
}

[
    {
        "productId": "628c3ad6e84ef0b554c2e7ba",
        "quantity": 5
    },
    {
        "productId": "628c3adfe84ef0b554c2e7bc",
        "quantity": 5
    }
]

*/
