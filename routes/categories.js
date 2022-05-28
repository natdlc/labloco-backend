const express = require("express");
const controller = require("../controllers/categories");
const auth = require("../auth");

const routes = express.Router();

const { verify, verifyAdmin } = auth;

// *EXTRA* Create category
routes.post("/new", verify, verifyAdmin, (req, res) => {
	controller
		.createCategory(req.body.name)
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

module.exports = routes;
