const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Email is required"],
	},
	password: {
		type: String,
		require: [true, "Password is required"],
	},
	firstName: {
		type: String,
		require: [true, "First name is required"]
	},
	lastName: {
		type: String,
		require: [true, "Last name is required"]
	},
	address: {
		type: String,
		default: "",
	},
	mobileNum: {
		type: String,
		default: "",
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	cart: [
		{
			productId: {
				type: String,
				required: [true, "Product must have an ID"],
			},
			quantity: {
				type: Number,
				default: 1,
			},
			dateAdded: {
				type: Date,
				default: new Date(),
			},
		},
	],
});

module.exports = mongoose.model("User", userSchema);
