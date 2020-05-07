const Lesson = require('../models/lesson');


exports.bookLesson = async (req, res, next) =>{
    
        const lesson = await Lesson.create(req.body)
        res.status(201).json({
        status: 'success',
        data: {
          data: lesson
        }
      });
}

exports.getAllLessons =  async (req, res, next) => {
    const lessons = await Lesson.find()

    res.status(200).json({
        status: 'success',
        results: lessons.length,
        data: {
          data: lessons,
          
        },
      });
};

exports.lessonById = async (req, res, next) =>{
    const id = req.params.id
    const lesson = await Lesson.findById(id);
    res.status(200).json({
        status: 'success',
        results: lesson,
    })
}

exports.updateLesson = function(req, res, next){
    const id = req.params.id;
    const  subjectId = req.body.subjectId;
    Lesson.findByIdAndUpdate(id, {$set:{subject: subjectId}}, function(err){
        if(!err){
            res.send("Successfully updated lesson");
        } else{
            res.send("failed to update lesson, please check lesson id");
        }
    })
}

exports.deleteLesson = async (req, res, next) => {
    const id = req.params.id;
    const lesson = await Lesson.findByIdAndDelete(id);
    res.status(200).json({
        status: 'success',
        message: "lesson deleted successfully"
    })
        
}
