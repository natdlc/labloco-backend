const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        require: [true, 'Password is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    cart: [
        {
            productId: {
                type: String,
                required: [true, 'Product must have an ID']
            },
            quantity: {
                type: Number,
                default: 1,
            },
            dateAdded: {
                type: Date,
                default: new Date()
            }
        }
    ]
});



module.exports = mongoose.model("User", userSchema);