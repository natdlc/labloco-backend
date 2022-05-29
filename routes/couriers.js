const express = require("express");
const controller = require("../controllers/couriers");

const auth = require("../auth");
const { verify, verifyAdmin } = auth;

const routes = express.Router();

// *EXTRA* Add courier (admin only)
routes.post("/", verify, verifyAdmin, (req, res) => {
	controller
		.addCourier(req.body)
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

// *EXTRA* Get couriers (admin only)
routes.get("/", verify, verifyAdmin, (req, res) => {
	controller
		.getCouriers()
		.then((result) => res.send(result))
		.catch((err) => res.send(err.message));
});

module.exports = routes;
