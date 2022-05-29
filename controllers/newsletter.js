const Newsletter = require("../models/Newsletter");

// *EXTRA* Create email
module.exports.signUp = (email) => {
	let newEmail = new Newsletter({ email });
	return newEmail
		.save()
		.then(() => {
			return { message: "Thank you for signing up!" };
		})
		.catch((err) => err.message);
};
