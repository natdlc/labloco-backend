const express = require("express");
const controller = require("../controllers/products");
const auth = require("../auth");

const routes = express.Router();

const { verify, verifyAdmin } = auth;

// Create new product
routes.post("/new", verify, verifyAdmin, (req, res) => {
	let productInfo = req.body;
	controller
		.createProduct(productInfo)
		.then((product) => res.send(product))
		.catch((err) => res.send(err.message));
});

// Get all active products
routes.get("/active", (req, res) => {
	controller
		.getActiveProducts()
		.then((products) => res.send(products))
		.catch((err) => res.send(err.message));
});

// Get specific product
routes.get("/:productId", (req, res) => {
	controller
		.getProduct(req.params.productId)
		.then((product) => res.send(product))
		.catch((err) => res.send(err.message));
});

// Update a product
routes.put("/:productId", verify, verifyAdmin, (req, res) => {
	controller
		.updateProduct(req.params.productId, req.body)
		.then((updatedProduct) => res.send(updatedProduct))
		.catch((err) => res.send(err.message));
});

// Archive product
routes.put("/archive/:productId", verify, verifyAdmin, (req, res) => {
	controller
		.archiveProduct(req.params.productId)
		.then((updatedProduct) => res.send(updatedProduct))
		.catch((err) => res.send(err.message));
});




module.exports = routes;
