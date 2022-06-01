const express = require("express");
const controller = require("../controllers/orders");
const auth = require("../auth");

const routes = express.Router();

const { verify, verifyAdmin } = auth;

// Non-admin discounted user checkout
routes.post("/new/:discountId", verify, controller.checkout);

// Non-admin user checkout
routes.post("/new/", verify, controller.checkout);

// Retrieve all orders (Admin only)
routes.get("/all", verify, verifyAdmin, controller.getAllOrders);

// Update order status (admin only)
routes.put("/status/:orderId", verify, verifyAdmin, controller.updateStatus);

module.exports = routes;
