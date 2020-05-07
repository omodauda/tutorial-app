const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema (
    {
        name: {
            type: String,
            required: true
        },
        category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        },
    }
);

subjectSchema.virtual('Tutors', {
    ref: 'RegisterSubject',
    foreignField: 'subject',
    localField: '_id'
  })
subjectSchema.pre(/^find/, function(next) {
    this.populate({
        path: 'registeredSubjects',
        select: 'firstName'
    })
    next()
})


subjectSchema.set('toObject', { virtuals: true });
subjectSchema.set('toJSON', { virtuals: true });

subjectSchema.index({ name: 'text' })  

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;