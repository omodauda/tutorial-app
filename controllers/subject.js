const Subject = require('../models/subject');


exports.createSubject =  async (req, res, next) => {
    const subject = await Subject.create(req.body)
    res.status(201).json({
        status: 'success',
        data: {
          data: subject
        }
      });
}

exports.getAllSubjects =  async (req, res, next) => {
    const subjects = await Subject.find()
    res.status(200).json({
        status: 'success',
        results: subjects.length,
        data: {
          data: subjects
        }
      });
}