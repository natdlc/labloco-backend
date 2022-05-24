const Product = require("../models/Product");

// Create new product
module.exports.createProduct = (productInfo) => {

    let { name, description, price } = productInfo;

    let newProduct = new Product(
        { name, description, price: price }
    );

    return newProduct.save()
        .then(product => product)
        .catch(err => err.message);
};

// Retrieve active products
module.exports.getActiveProducts = () => {
    return Product.find({})
        .then(products => products)
        .catch(err => err.message)
};

// Retrieve specific product
module.exports.getProduct = (productId) => {
    return Product.findById(productId)
        .then(product => product)
        .catch(err => err.message);
};

// Update product
module.exports.updateProduct = (productId, newData) => {
    return Product
        .findByIdAndUpdate(productId, newData)
        .then(() => {
            return {message: "Update success"}
        })
        .catch(err => err.message);
};

// Archive product
module.exports.archiveProduct = (productId) => {
    return Product
        .findByIdAndUpdate(productId, { isActive: false })
        .then(() => {
            return { message: "Product archived" }
        })
        .catch(err => err.message);
};