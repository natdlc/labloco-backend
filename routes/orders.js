const express = require("express");
const controller = require("../controllers/orders");
const auth = require("../auth");

const routes = express.Router();

const { verify, verifyAdmin } = auth;

// Non-admin User checkout (promise all)
/* routes.post("/new", verify, (req, res) => {
	let userId = req.user.id;
	let orderInfo = req.body;
	controller
		.createOrder(userId, orderInfo)
		.then((order) => res.send(order))
		.catch((err) => res.send(err.message));
}); */

// Non-admin User checkout (async await)
routes.post("/new", verify, controller.checkout);

// Retrieve all orders (Admin only)
routes.get("/all", verify, verifyAdmin, controller.getAllOrders);

module.exports = routes;
