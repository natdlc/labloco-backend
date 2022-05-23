const express = require("express");
const controller = require("../controllers/products");
const auth = require("../auth");

const routes = express.Router();

const { verify, verifyAdmin } = auth;

// Create
routes.post("/new", verify, verifyAdmin, (req, res) => {
	let productInfo = req.body;
	controller
		.createProduct(productInfo)
		.then((product) => res.send(product))
		.catch((err) => res.send(err.message));
});

module.exports = routes;
