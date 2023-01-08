console.log("Front end javascript login")

const form = document.querySelector("form")
// ERROR DIV FIELDS WHICH ARE EMPTY AT THIS MOMENT
const emailError = document.querySelector(".email.error")
const passwordError = document.querySelector(".password.error")

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // RESETTING ERRORS
    emailError.textContent = ""
    // RESETTING ERRORS
    passwordError.textContent = ""

    // GETTING THE FILLED VALUES IN THE FORM
    const email = form.email.value
    const password = form.password.value;

    console.log("Email value filled is : ", email)
    console.log("Password value filled is : ", password)

    // SENDING TO THE DATABASE
    try {
        const res = await fetch("/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" }
        })

        // CONTAINS THE INFORMATION FROM THE DATABASE IF THE USER IS ADDED OR NOT
        const data = await res.json();
        console.log("Data  : ", data)

        // IF THERE IS A ERROR FROM THE DATABASE AND BACKEND THEN DATA.ERROR WILL BE POPULATED
        if (data.errors) {

            console.log("Data email in frontEnd Login: ", data.errors.email)
            console.log("Data Password in frontEnd Login: ", data.errors.password)


            // FILLING THE DIV TAG IN THE SIGN UP FORM IF ERROR IN THE EMAIL FIELD
            emailError.textContent = data.errors.email

            // FILLING THE DIV TAG IN THE SIGN UP FORM IF ERROR IN THE PASSWORD FIELD
            passwordError.textContent = data.errors.password
        }

        else {
            console.log("Everything ok successfully login")
            location.assign("/")
        }
    }
    catch (err) {
        console.log("Error fetch api: ", err)
    }

})