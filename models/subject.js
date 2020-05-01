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
        ref: 'Category'
        }
    }
);

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;