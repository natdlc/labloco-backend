const express = require("express");
const controller = require("../controllers/products");
const auth = require("../auth");
const upload = require("../middleware/upload");

const routes = express.Router();

const { verify, verifyAdmin } = auth;

// Create Product (Admin only)
routes.post("/new", verify, verifyAdmin, (req, res) => {
	let productInfo = req.body;
	controller
		.createProduct(productInfo)
		.then((product) => res.send(product))
		.catch((err) => res.send(err.message));
});

// *EXTRA* Add image for product (admin only)
routes.post(
	"/image/:productId",
	verify,
	verifyAdmin,
	upload.single("file"),
	async (req, res) => {
		if (req.file === undefined) return res.send("you must select a file.");
		return controller
			.uploadImage(req.params.productId, req.file)
			.then((result) => res.send(result))
			.catch((err) => res.send(err.message));
	}
);

// *EXTRA Add custom order option (admin only)
routes.post("/option/:productId", verify, verifyAdmin, (req, res) => {
	controller
		.addOption(req.params.productId, req.body)
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

// Retrieve all active products
routes.get("/active", (req, res) => {
	controller
		.getActiveProducts()
		.then((products) => res.send(products))
		.catch((err) => res.send(err.message));
});

// Retrieve single product
routes.get("/:productId/", (req, res) => {
	controller
		.getProduct(req.params.productId)
		.then((product) => res.send(product))
		.catch((err) => res.send(err.message));
});

// *EXTRA* Retrieve all products (admin only)
routes.get("/", verify, verifyAdmin, (req, res) => {
	controller
		.getAllProducts()
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

// Update Product information (Admin only)
routes.put("/:productId", verify, verifyAdmin, (req, res) => {
	controller
		.updateProduct(req.params.productId, req.body)
		.then((updatedProduct) => res.send(updatedProduct))
		.catch((err) => res.send(err.message));
});

// Archive Product (Admin only)
routes.put("/archive/:productId", verify, verifyAdmin, (req, res) => {
	controller
		.archiveProduct(req.params.productId)
		.then((updatedProduct) => res.send(updatedProduct))
		.catch((err) => res.send(err.message));
});

module.exports = routes;
