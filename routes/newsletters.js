const express = require("express");
const controller = require("../controllers/newsletter");

const routes = express.Router();

// *EXTRA* Create email
routes.post("/", (req, res) => {
	controller
		.signUp(req.body.email)
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

module.exports = routes;
