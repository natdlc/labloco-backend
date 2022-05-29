const express = require("express");
const controller = require("../controllers/newsletter");

const auth = require("../auth");
const { verify, verifyAdmin } = auth;

const routes = express.Router();

// *EXTRA* Subscribe
routes.post("/", (req, res) => {
	controller
		.subscribe(req.body.email)
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

// *EXTRA* Get emails (admin only)
routes.get("/", verify, verifyAdmin, (req, res) => {
	controller
		.getEmails()
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

// *EXTRA* Unsubscribe
routes.delete("/", (req, res) => {
	controller
		.unsubscribe(req.body.email)
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

module.exports = routes;
