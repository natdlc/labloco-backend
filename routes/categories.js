const express = require("express");
const controller = require("../controllers/categories");
const auth = require("../auth");

const routes = express.Router();

const { verify, verifyAdmin } = auth;

// *EXTRA* Create category (admin only)
routes.post("/new", verify, verifyAdmin, (req, res) => {
	controller
		.createCategory(req.body.name)
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

// *EXTRA* Retrieve active categories
routes.get("/active", (req, res) => {
	controller
		.getActiveCategories()
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

// *EXTRA* Retrieve all categories (admin only)
routes.get("/all", verify, verifyAdmin, (req, res) => {
	controller
		.getAllCategories()
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

// *EXTRA* Edit category name (admin only)
routes.put("/edit/:categoryId", verify, verifyAdmin, (req, res) => {});

// *EXTRA* Archive a category (admin only)
routes.put("/archive/:categoryId", verify, verifyAdmin, (req, res) => {
	controller
		.archiveCategory(req.params.categoryId)
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

// *EXTRA* Delete a category (admin only)
routes.delete("/delete/:categoryId", verify, verifyAdmin, (req, res) => {
	controller
		.deleteCategory(req.params.categoryId)
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

module.exports = routes;
