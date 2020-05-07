const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registerSubjectSchema = new Schema({
    tutors:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    active:{
        type: Boolean
    }
}, {timestamps: true});

// registerSubjectSchema.virtual('Tutors', {
//     ref: 'RegisterSubject',
//     foreignField: 'subject',
//     localField: '_id'
//   })

// registerSubjectSchema.pre(/^find/, function(next) {
//     this.populate({
//         path: 'tutor',
//         select: 'firstName email'
//     })
//     next()
// })

registerSubjectSchema.set('toObject', { virtuals: true });
registerSubjectSchema.set('toJSON', { virtuals: true });

const registerSubject = mongoose.model("RegisterSubject", registerSubjectSchema);
module.exports = registerSubject;