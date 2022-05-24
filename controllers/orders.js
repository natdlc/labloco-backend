const Order = require("../models/Order");
const Product = require("../models/Product");

// Non-admin User checkout (promise all)
/* module.exports.createOrder = (userId, orderInfo) => {

	//if more than one product
    if (orderInfo.length) {
        const subtotals = [];
        let total = 0;
        for (let i = 0; i < orderInfo.length; i++) {
            subtotals.push(
                Product.findById(orderInfo[i].productId)
                    .then(product => {
                        return orderInfo[i].quantity * product.price
                    })
                    .catch(err => err.message))
        }

        let order = Promise.all(subtotals).then(result => {
            for (let i = 0; i < result.length; i++) {
                total += result[i];
            }

            let newOrderDetails = {
                userId: userId,
                totalAmount: total
            }

            let newOrder = new Order(newOrderDetails);

            for (let i = 0; i < orderInfo.length; i++) {
                newOrder.products.push(orderInfo[i]);
            }

            return newOrder.save()
                .then(order => order)
                .catch(err => err.message);
        }).catch(err => err.message)

        return order;

    } else { // if only one product
        
		let order = Product.findById(orderInfo.productId)
			.then((product) => {

				let newOrderDetails = {
					userId: userId,
					totalAmount: product.price * orderInfo.quantity,
				};

				let newOrder = new Order(newOrderDetails);

				newOrder.products.push(orderInfo);

				return newOrder
					.save()
					.then((order) => order)
					.catch((err) => err.message);
			})
            .catch((err) => err.message);
        
        return order;
    }
    
}; */

// Non-admin User checkout (async await)
module.exports.checkout = async (req, res) => {
	if (req.user.isAdmin) {
		return res.send({ message: "Action forbidden" });
	} else {
		let cart = req.body;
		let subtotals = [];
		if (cart.length) {
			for (let i = 0; i < cart.length; i++) {
				let product = await Product.findById(cart[i].productId)
					.then((result) => result)
					.catch((err) => err.message);
				subtotals.push(product.price * cart[i].quantity);
			}

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
				.catch((err) => req.send(err.message));
		} else {
			return Product.findById(cart.productId)
				.then((product) => {
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
        "productId": "628741acbd02d705404d6476",
        "quantity": 5
    },
    {
        "productId": "628b734c8780922d348d1026",
        "quantity": 5
    }
]

*/
