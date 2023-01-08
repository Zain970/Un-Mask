const mongoose = require("mongoose");
const { isEmail } = require("validator")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        // CUSTOM VALIDATION
        validate: [isEmail, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minumum password length is 6 characters"]
    }
})

// MONGOOSE HOOKS
userSchema.post("save", function (doc, next) {
    console.log("New user was created and saved")
    next();
})

userSchema.pre("save", function (next) {
    console.log("user about to be created and saved", this)
    next()
})

// STATIC METHOD ON USER MODEL
userSchema.statics.login = async function (email, password) {

    // CHECKING BY EMAIL
    const user = await this.findOne({ email })

    // IF USER WITH THAT EMAIL PRESENT IN THE MONGODB
    if (user) {

        // IF PASSWORD MATCH
        if (password == user.password) {

            // LOGINING THE USER
            return user
        }
        throw Error("Incorrect password")
    }
    throw Error("Incorrect email")
}

const User = mongoose.model("user", userSchema)
module.exports = User