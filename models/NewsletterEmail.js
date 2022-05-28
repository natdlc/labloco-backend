const mongoose = require("mongoose");

const newsletterEmailSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "Email is required for newsletter"],
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	createdOn: {
		type: Date,
		default: new Date(),
	},
});

module.exports = new mongoose.model("NewsletterEmail", newsletterEmailSchema);
