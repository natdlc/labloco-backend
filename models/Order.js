const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    totalAmount: {
        type: Number,
        required: [true, "Total Amount is required"]
    },
    purchasedOn: {
        type: Date,
        default: new Date()
    },
    userId: {
        type: String,
        required: [true, "User ID is required"]
    },
    products: [
        {
            productId: {
                type: String,
                required: [true, "Product ID is required"]
            },
            quantity: {
                type: Number,
                required: [true, "Product quantity is required"]
            },
            price: {
                type: Number,
                required: [true, "Product price is required"]
            }
        }
    ],
})

module.exports = new mongoose.model("Order", orderSchema);