const User = require("../models/User");
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