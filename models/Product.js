const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    options: [
        {
            label: {
                type: String,
                required: [true, "Label is required"]
            },
            value: {
                type: String,
                required: [true, "Value is required"]
            }
        }
    ]
});

module.exports = mongoose.model("Product", productSchema);