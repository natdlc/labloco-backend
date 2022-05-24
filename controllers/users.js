const User = require("../models/User");
const Order = require("../models/Order")
const bcrypt = require("bcrypt");
require("dotenv").config();

const auth = require("../auth");

const salt = +process.env.SALT;

// Create user
module.exports.register = (userInfo) => {
	let { email, password } = userInfo;

	let newUser = new User({
		email,
		password: bcrypt.hashSync(password, salt),
	});

	return newUser
		.save()
		.then((user) => user)
		.catch((err) => err.message);
};

// Create auth token for login
module.exports.userLogin = (user) => {
	return User.findOne({ email: user.email })
		.then((result) => {
			const pwValid = bcrypt.compareSync(user.password, result.password);
			if (pwValid) {
				return {
					accessToken: auth.createAccessToken(result.toObject()),
				};
            } else {
                return false;
            }
		})
		.catch((err) => err.message);
};

// Get user profile
module.exports.getProfile = (userId) => {
    return User.findById(userId)
        .then(user => {
            user.password = '';
            return user;
        })
        .catch(err => err.message);
};

// *SG* Get user orders
module.exports.getUserOrders = (userId) => {
	return Order.find({ userId })
		.then((result) => result)
		.catch((err) => err.message);
};

// Update user as admin
module.exports.setAdmin = (userId) => {
	return User.findByIdAndUpdate(userId, { isAdmin: true })
		.then(() => {return {message: "SUCCESS: User updated to admin"}})
		.catch(err => err.message)
};