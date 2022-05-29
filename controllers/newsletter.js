const Newsletter = require("../models/Newsletter");

// *EXTRA* Subscribe
module.exports.subscribe = async (email) => {
	let emailFound = await Newsletter.findOne({ email })
		.then((result) => result)
		.catch(() => false);
	if (emailFound) {
		return { message: "You're already subscribed" };
	} else {
		let newSubscription = new Newsletter({ email });
		return newSubscription
			.save()
			.then(() => {
				return { message: "Thank you for signing up!" };
			})
			.catch((err) => err.message);
	}
};

// *EXTRA* Retrieve emails (admin only)
module.exports.getEmails = () => {
	return Newsletter.find({})
		.then((result) => result)
		.catch((err) => err.message);
};

// *EXTRA* Unsubscribe
module.exports.unsubscribe = async (email) => {
	let emailFound = await Newsletter.findOne({ email })
		.then((email) => email)
		.catch((err) => err.message);
	if (emailFound) {
		return Newsletter.findByIdAndRemove(emailFound._id)
			.then(() => {
				return { message: "You have unsubscribed" };
			})
			.catch((err) => err.message);
	} else {
		return { message: "No such email exists" };
	}
};
