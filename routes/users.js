const express = require("express");
const controller = require("../controllers/users");
const auth = require("../auth");

const { verify, verifyAdmin } = auth;

//create router
const routes = express.Router();

// Create user
routes.post("/register", (req, res) => {
	let userData = req.body;
	controller
		.register(userData)
		.then((newUser) => res.send(newUser))
		.catch((err) => res.send(err.message));
});

// Token creation when logging in
routes.post("/login", (req, res) => {
	controller
		.userLogin(req.body)
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

// *EXTRA* Add to cart (authed)
routes.post("/cart/add/", verify, (req, res) => {
	let productInfo = req.body;
	controller
		.addToCart(req.user.id, productInfo, req.user.isAdmin)
		.then((result) => res.send(result))
		.catch((err) => res.send(err));
});
// *EXTRA* Clear cart
routes.delete("/cart/clear", verify, (req, res) => {
	controller
		.clearCart(req.user.id)
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

// *EXTRA* Retrieve authenticated user profile
routes.get("/profile/", verify, (req, res) => {
	controller
		.getProfile(req.user.id)
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

// *STRETCH* Retrieve user orders
routes.get("/orders", verify, (req, res) => {
	let userId = req.user.id;
	controller
		.getUserOrders(userId)
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

// *EXTRA* Retrieve all users (admin only)
routes.get("/all", verify, verifyAdmin, (req, res) => {
	controller
		.getAllUsers()
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

// *EXTRA* Retrieve specific user order
routes.get("/order/:orderId", verify, (req, res) => {
	controller
		.getUserOrder(req.user.id, req.params.orderId)
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

// *STRETCH* Update user as admin
routes.put("/:userId/admin", verify, verifyAdmin, (req, res) => {
	let userId = req.params.userId;
	controller
		.setAdmin(userId)
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

// *EXTRA* Change password (user only)
routes.put("/password/", verify, (req, res) => {
	controller
		.changePassword(req.user.id, req.body)
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

// *EXTRA* Increase product quantity
routes.put(
	"/cart/increase/quantity/:productId/:uniqueId",
	verify,
	(req, res) => {
		controller
			.increaseQuantity(req.user.id, req.params.productId, req.params.uniqueId)
			.then((result) => res.send(result))
			.catch((err) => res.send(err.message));
	}
);

// *EXTRA* Decrease product quantity
routes.put(
	"/cart/decrease/quantity/:productId/:uniqueId",
	verify,
	(req, res) => {
		controller
			.decreaseQuantity(req.user.id, req.params.productId, req.params.uniqueId)
			.then((result) => res.send(result))
			.catch((err) => res.send(err.message));
	}
);

// *EXTRA* Delete product from cart
routes.delete(
	"/cart/delete/product/:productId/:uniqueId",
	verify,
	(req, res) => {
		controller
			.deleteProduct(req.user.id, req.params.productId, req.params.uniqueId)
			.then((result) => res.send(result))
			.catch((err) => res.send(err.message));
	}
);

module.exports = routes;
