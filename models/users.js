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

userSchema.virtual('Subjects_registered', {
    ref: 'RegisterSubject',
    foreignField: 'user',
    localField: '_id'
  })
userSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'registeredSubjects',
        select: '-__v'
    })
    next()
})

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("User", userSchema);