const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "User ID is required"]
    },
    totalAmount: {
        type: Number,
        required: [true, "Total Amount is required"]
    },
    purchasedOn: {
        type: Date,
        default: new Date()
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
        }
    ],
})

module.exports = new mongoose.model("Order", orderSchema);