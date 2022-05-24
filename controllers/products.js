const Product = require("../models/Product");

// Create Product (Admin only)
module.exports.createProduct = (productInfo) => {

    let { name, description, price } = productInfo;

    let newProduct = new Product(
        { name, description, price: price }
    );

    return newProduct.save()
        .then(product => product)
        .catch(err => err.message);
};

// Retrieve all active products
module.exports.getActiveProducts = () => {
    return Product.find({})
        .then(products => products)
        .catch(err => err.message)
};

// Retrieve single product
module.exports.getProduct = (productId) => {
    return Product.findById(productId)
        .then(product => product)
        .catch(err => err.message);
};

// Update Product information (Admin only)
module.exports.updateProduct = (productId, newData) => {
    return Product
        .findByIdAndUpdate(productId, newData)
        .then(() => {
            return {message: "Update success"}
        })
        .catch(err => err.message);
};

// Archive Product (Admin only)
module.exports.archiveProduct = (productId) => {
    return Product
        .findByIdAndUpdate(productId, { isActive: false })
        .then(() => {
            return { message: "Product archived" }
        })
        .catch(err => err.message);
};