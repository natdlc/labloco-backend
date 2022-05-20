const express = require("express");
const controller = require("../controllers/users");

const routes = express.Router();

// Create
routes.post(
    "/register",
    (req, res) => {
        let userData = req.body;
        controller.register(userData)
            .then(newUser => res.send(newUser))
            .catch(err => res.send(err.message));
    }
);





module.exports = routes;