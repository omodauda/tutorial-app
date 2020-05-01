const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema ({
    name: {
        type: String,
        required: true
    },


    
});

categorySchema.virtual('subjects', {
    ref: 'Subject',
    foreignField: 'category',
    localField: '_id'
  })
categorySchema.pre(/^find/, function(next) {
    this.populate({
        path: 'subjects',
        select: '-__v'
    })
    next()
})

categorySchema.set('toObject', { virtuals: true });
categorySchema.set('toJSON', { virtuals: true });


const Category = mongoose.model('Category', categorySchema);
module.exports = Category;





