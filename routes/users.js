const express = require("express");
const controller = require("../controllers/users");
const auth = require("../auth");


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

// Retrieving user profile
routes.get("/profile", auth.verify, (req, res) => {
    controller.getProfile(req.user.id)
        .then(result => res.send(result))
        .catch(err => res.send(err.message));
});

module.exports = routes;
