const express = require("express");
const controller = require("../controllers/orders");


const routes = express.Router();


// Create
routes.post(
    "/new-order",
    (req, res) => {
        let orderInfo = req.body;
        controller.createOrder(orderInfo)
            .then(order => res.send(order))
            .catch(err => res.send(err.message));
    }
);

module.exports = routes;