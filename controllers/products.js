const Product = require("../models/Product");




// Create
module.exports.createProduct = (productInfo) => {

    let { name, description, price } = productInfo;

    let newProduct = new Product(
        { name, description, price: price }
    );

    return newProduct.save()
        .then(product => product)
        .catch(err => err.message);
};