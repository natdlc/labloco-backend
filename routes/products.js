const express = require("express");
const controller = require("../controllers/products");


const routes = express.Router();



// Create
routes.post(
    "/new-product",
    (req, res) => {
        let productInfo = req.body;
        controller.createProduct(productInfo)
            .then(product => res.send(product))
            .catch(err => res.send(err.message));
    }
);

module.exports = routes;