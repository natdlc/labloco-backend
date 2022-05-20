const Order = require("../models/Order");



// Create
module.exports.createOrder = (orderInfo) => {

    let { totalAmount, userId } = orderInfo;

    let newOrder = new Order({ totalAmount, userId });

    return newOrder.save()
        .then(order => order)
        .catch(err => err.message);
};