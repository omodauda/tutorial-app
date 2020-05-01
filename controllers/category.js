const Category = require('../models/category');

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


exports.getAllCategories =  async (req, res, next) => {
    const categories = await Category.find()

    res.status(200).json({
        status: 'success',
        results: categories.length,
        data: {
          data: categories,
          
        },
      });
}
