const mongoose = require(`mongoose`)

const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

let userSchema = new mongoose.Schema(
   {
        name: {type: String},
        email: {type: String, match: [emailPattern, "Email must be valid."]},
        password: {type: String, /* match: [passwordPattern, "Password must have at leat 6 characters, including 1 number and 1 special character."] */},
        confirmPassword: {type: String, /* match: [this.password, "Passwords must match."] */}
   },
   {
        collection: `skates`
   })

module.exports = mongoose.model(`skates`, userSchema)