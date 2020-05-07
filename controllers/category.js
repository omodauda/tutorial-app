const Category = require('../models/category');
const verifyToken = require('../middleware/auth');

exports.createCategory =  async (req, res, next) => {
    const category = await Category.create(req.body)
    category.save();
    res.status(201).json({
        status: 'success',
        data: {
          data: category
        }
      });
}


exports.getAllCategories =  (verifyToken, async (req, res, next) => {
    const categories = await Category.find()

    res.status(200).json({
        status: 'success',
        results: categories.length,
        data: {
          data: categories,
          
        },
      });
});

exports.getCategoryById = async (req, res, next) =>{
    const category = await Category.findById(req.params.categoryId).populate({
        path: 'subjects',
        select: '-__v -tutors' 
      }).select('-__v')
    res.status(200).json({
        status: 'success',
        data: {
            data: category
        }
    })
}

exports.updateCategory = async (req, res, next) =>{
  const id = req.params.id;
  const category = await Category.findByIdAndUpdate(id, {$set: {name:req.body.name}})
  res.status(200).json({
    status: 'success',
    message: 'category updated successfully',
    data: {
      data: category
    }
  })
}

exports.deleteCategory = function(req, res, next){
  const id = req.params.id;
  Category.findByIdAndDelete(id, function(err){
    if(!err){
      res.send("category deleted successfully");
    }else{
      res.send(err);
    }
  })
}

