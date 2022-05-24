const express = require("express");
const controller = require("../controllers/orders");
const auth = require("../auth");

const routes = express.Router();

const { verify } = auth;

// Create order
routes.post("/new", verify, (req, res) => {
    let userId = req.user.id;
	let orderInfo = req.body;
	controller
		.createOrder(userId, orderInfo)
		.then((order) => res.send(order))
		.catch((err) => res.send(err.message));
});

module.exports = routes;
