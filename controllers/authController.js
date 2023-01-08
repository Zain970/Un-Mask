const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
// handle errors
const handleErrors = (err) => {
    console.log("Error type : ", err.message)
    console.log("Error Code", err.code);

    // ANY ERROR WILL BE ENCLOSED IN THIS OBJECT

    let errors = { email: "", password: "" }

    if (err.code == 11000) {
        errors.message = "that email is already registered"
        return errors
    }
    // Incorrect email
    if (err.message == "Incorrect email") {
        errors.email = "that email is not registered";
    }

    // Incorrect password
    if (err.message == "Incorrect password") {
        errors.password = "Invalid Password";
    }


    if (err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(error => {
            errors[error.properties.path] = error.properties.message
        })
    }
    return errors
}

const signup_get = (req, res) => {
    res.render("signup")
}
const login_get = (req, res) => {
    res.render("login")
}
const signup_post = async (req, res) => {
    const { email, password } = req.body
    console.log(email, " : ", password)

    try {
        const user = await User.create({
            email,
            password
        })

        // SENDING THE SAVED USER BACK
        res.status(201).json(user)
    }
    catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}
const login_post = async (req, res) => {
    const { email, password } = req.body;
    console.log("Email provided in login post : ", email)
    console.log("Password provided in login post : ", password)

    try {
        const user = await User.login(email, password)

        res.status(200).json({ user: user._id })
    }
    catch (err) {
        // Errors are got from the static method of User model Login function
        const errors = handleErrors(err);
        res.status(400).json({
            errors
        })
    }
}

module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post
}