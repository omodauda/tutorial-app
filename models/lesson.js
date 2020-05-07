const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    subject:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
    },
    date:{
        type: String
    }
}, {timestamps: true});

module.exports= mongoose.model("Lesson", lessonSchema);