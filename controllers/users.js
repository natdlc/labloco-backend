const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
require("dotenv").config();

const auth = require("../auth");

const salt = +process.env.SALT;

// User registration
module.exports.register = async (userInfo) => {
	let { email, password } = userInfo;

	let userFound = await User.findOne({ email })
		.then((res) => res)
		.catch((err) => err.message);

	if (userFound) {
		return new Promise((resolve, reject) => {
			return resolve({ message: "Registration failed: email exists" });
		});
	} else {
		let newUser = new User({
			email,
			password: bcrypt.hashSync(password, salt),
		});

		return newUser
			.save()
			.then(() => {
				return { message: "Successfully registered" };
			})
			.catch((err) => err.message);
	}
};

// User authentication
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

// *EXTRA* Add to cart
module.exports.addToCart = async (userId, productInfo, userIsAdmin) => {
	if (userIsAdmin) {
		return { message: "Action forbidden" };
	} else {
		let { productId, quantity } = productInfo;

		return Product.findById(productId)
			.then((product) => {
				if (product.isActive) {
					let newProduct = { productId: product._id, quantity };

					return User.findById(userId).then((user) => {
						user.cart.push(newProduct);
						return user
							.save()
							.then((result) => result)
							.catch((err) => err.message);
					});
				} else {
					return Promise.reject({ message: "Product is inactive" });
				}
			})
			.catch((err) => err.message);
	}
};

// *EXTRA* Remove product from cart
module.exports.removeFromCart = (userId, productId) => {
	if (userId) {
		return User.findByIdAndUpdate(
			userId,
			{
				$pull: {
					cart: {
						productId,
					},
				},
			},
			{ safe: true, upsert: true }
		)
			.then((result) => {
				return { message: "Product removed from cart" };
			})
			.catch((err) => err.message);
	} else {
		return { message: "user not found" };
	}
};

// *EXTRA* Clear cart
module.exports.clearCart = (userId) => {
	return User.findByIdAndUpdate(userId, { cart: [] })
		.then((result) => {
			return { message: "cart cleared" };
		})
		.catch((err) => err.message);
};
// *EXTRA* Retrieve authenticated user profile
module.exports.getProfile = (userId) => {
	return User.findById(userId)
		.then((user) => {
			user.password = "";
			return user;
		})
		.catch((err) => err.message);
};

// *STRETCH* Retrieve authenticated user’s orders
module.exports.getUserOrders = (userId) => {
	return Order.find({ userId })
		.then((result) => result)
		.catch((err) => err.message);
};

// *STRETCH* Set user as admin (Admin only)
module.exports.setAdmin = (userId) => {
	return User.findByIdAndUpdate(userId, { isAdmin: true })
		.then(() => {
			return { message: "SUCCESS: User updated to admin" };
		})
		.catch((err) => err.message);
};

// *EXTRA* Change pasword
module.exports.changePassword = (userId, userInfo) => {
	let currentPassword = userInfo.currentPassword;
	let newPassword = userInfo.newPassword;

	return User.findById(userId)
		.then((user) => {
			const pwValid = bcrypt.compareSync(currentPassword, user.password);
			if (pwValid) {
				user.password = bcrypt.hashSync(newPassword, salt);
				return user
					.save()
					.then(() => {
						return { message: "Password updated" };
					})
					.catch((err) => err.message);
			} else {
				return { message: "Update failed, current password is wrong" };
			}
		})
		.catch((err) => err.message);
};
