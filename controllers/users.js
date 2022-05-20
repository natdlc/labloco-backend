const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();


const salt = +process.env.SALT


// Create
module.exports.register = (userInfo) => {

    let { email, password } = userInfo;

    let newUser = new User(
        {
            email,
            password: bcrypt.hashSync(password, salt)
        }
    );

    return newUser.save()
        .then(user => user)
        .catch(err => err.message);
}