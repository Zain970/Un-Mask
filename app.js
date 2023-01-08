const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
// const cookieParser = require("cookie-parser");

/////////////// INITIALIZING OUR APP
const app = express();

///////// MIDDLE WARE FOR STATIC FILES /////////////
staticDirectory = path.join(__dirname, "/public")
app.use(express.static(staticDirectory));
/////////////////////////////////////////////////////

app.use(express.json());

// app.use(cookieParser);

// SETTING THE VIEW ENGINE
app.set("view engine", "ejs")

// DATABASE CONNECTION
const dbUrl = "mongodb://localhost:27017/Authentication"
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log("Connected to the database")
    app.listen("3000", () => {
        console.log("Server started listening")
    })
}).catch((err) => {
    console.log("Error connecting to the database", err)
})


// BASIC ROUTES AFTER LOG IN
app.get("/", (req, res) => {

    res.render("home")
})
app.get("/help", (req, res) => {
    res.render("help")
})
app.get("/contact", (req, res) => {
    res.render("contact")
})
app.get("/about", (req, res) => {
    res.render("about")
})


// LOGIN AND SIGNUP
app.use(authRoutes)

