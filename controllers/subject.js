const Subject = require('../models/subject');
const Category = require('../models/category');


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
    console.log(req.query);
    let searchQuery = { }
    if (req.query.q) {
        const searchString = req.query.q.split(',').join(' ')
        searchQuery = ({ $text: { $search: searchString }})
    }
    const subjects = await Subject.find(searchQuery).sort({ name: 1 })
    res.status(200).json({
        status: 'success',
        results: subjects.length,
        data: {
          data: subjects
        }
      });
}


exports.subjectById = function(req, res, next) {
    const id = req.params.id;
    Subject.findById(id).populate({
        path: 'Tutors',
        select: '-__v -createdAt -updatedAt'
    }).select('_id name category')
    .exec(function(err, foundSubject){
        if(foundSubject){
            res.send(foundSubject);
        }
         else{
            res.send("no subject matching that id was found");
        }
    });
}



exports.updateSubject = function(req, res, next){
    const id = req.params.id;
    const subjectName = req.body.name;
    Subject.findByIdAndUpdate(id, {$set:{name: subjectName}}, function(err){
        if(!err){
            res.send("Successfully updated subject");
        } else{
            res.send("failed to update subject, please check subject id");
        }
    })
}

exports.deleteSubject = function(req, res, next){
    const id = req.params.id;
    Subject.findByIdAndDelete(id, function(err){
        if(!err){
            res.send("subject deleted successfully");
        }else {
            res.send(err);
        }
    })
}
