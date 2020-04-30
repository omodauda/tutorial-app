const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
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
    role: {
        type: String,
        default: "student",
        enum: ["student", "tutor", "admin"]
    },
    accesscontrol: {
        type: String
    }

}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);