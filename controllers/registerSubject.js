const registerSubject = require('../models/registerSubject');


exports.registerSubject = async (req, res, next) =>{
    const subject = await registerSubject.create(req.body)
    res.status(201).json({
        status: 'success',
        data: {
            data: subject
        }
    });
}

exports.updateRegisteredSubject = function(req, res, next) {
    const id = req.params.id;
    const subjectId = req.body.id;
    registerSubject.findByIdAndUpdate(id, {$set:{subject: subjectId}}, function(err){
        if(!err){
            res.send("Successfully updated registered subject");
        } else {
            res.send(err);
        }
    });
}

exports.deleteRegisteredSubject = function(req, res, next) {
    const id = req.params.id;
    registerSubject.findByIdAndDelete(id, function(er){
        if(!err){
            res.send("Registerd subject deleted successfully")
        } else{
            res.send("unmatch id provided");
        }
    })
}


// exports.updateSubject = function(req, res, next){
//     const id = req.params.id;
//     const subjectName = req.body.name;
//     Subject.findByIdAndUpdate(id, {$set:{name: subjectName}}, function(err){
//         if(!err){
//             res.send("Successfully updated subject");
//         } else{
//             res.send("failed to update subject, please check subject id");
//         }
//     })
// }










// exports.createSubject =  async (req, res, next) => {
//     const subject = await Subject.create(req.body)
//     res.status(201).json({
//         status: 'success',
//         data: {
//           data: subject
//         }
//       });
// }