const res = require("express/lib/response");
const Order = require("../models/Order");
const Product = require("../models/Product");

// Create order
module.exports.createOrder = (userId, orderInfo) => {

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
