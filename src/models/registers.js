const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resume: {
        type: String,  // Store the file path
        required: true
    }
});

const Register = new mongoose.model("Register", userSchema);

module.exports = Register;
