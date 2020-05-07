const router = require("express").Router();
const { signUp, logIn, users, usersById, tutors, tutorById, deleteTutor } = require("../controllers/users");
const {checkAuth, restrictAccess} = require('../middleware/auth');
const {bookLesson, getAllLessons, lessonById, updateLesson, deleteLesson} = require('../controllers/lesson');

const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory} = require('../controllers/category');
const { createSubject, getAllSubjects, subjectById, updateSubject, deleteSubject} = require('../controllers/subject');

const {registerSubject, updateRegisteredSubject, deleteRegisteredSubject} = require('../controllers/registerSubject');

//test route to make sure it is working (accessed at GET http://localhost:3000/tutorial-app/api/v1)
router.get('/', function(req,res){
    res.json({message: "Welcome to tutorial app"});
});

// Register our routes

router.post('/signup', signUp);
router.post('/login', logIn);

//users
router.get('/users', users);
router.get('/users/:id', usersById);

//tutors
router.get('/tutors', checkAuth, restrictAccess('admin'), tutors); //retrieve all tutors -admin
router.get('/tutors/:id', checkAuth, restrictAccess('admin'), tutorById); //get a tutor by id -admin
router.delete('/tutors/:id', checkAuth, restrictAccess('admin'), deleteTutor); //deactivate a tutor by id -admin
router.post('/tutors/registersubject', checkAuth, restrictAccess('tutor'), registerSubject); //register to take a subject in a category -tutor
router.patch('/tutors/registersubject', checkAuth, restrictAccess('tutor'), updateRegisteredSubject); //update a registered subject -tutor
router.delete('/tutors/registeredsubject/:id', checkAuth, restrictAccess('tutor'), deleteRegisteredSubject) //delete a registered subject -tutor


//category routes
router.post('/categories', checkAuth, restrictAccess('admin'), createCategory);
router.get('/categories', checkAuth, getAllCategories); //retrieve all categories - general
router.get('/categories/:categoryId/subjects', getCategoryById); //retrieve all subjects by category - general
router.patch('/categories/:id', checkAuth, restrictAccess('admin'), updateCategory); //update a category -admin
router.delete('/categories/:id', checkAuth, restrictAccess('admin'), deleteCategory); //delete a category - admin

//subject routes
router.post('/subjects', checkAuth, restrictAccess('admin'), createSubject); //create subject under categories - admin
router.get('/subjects', getAllSubjects); //search for a subject by name in ascending order -general
router.get('/subjects/:id', checkAuth, subjectById); //retrieve a subject in a category by id -general
router.patch('/subjects/:id', checkAuth, restrictAccess('admin'), updateSubject); //update a subject in a category by id -admin
router.delete('/subjects/:id', checkAuth, restrictAccess('admin'), deleteSubject); //delete a subject in a category by id -admin

//lesson
router.post('/lessons', checkAuth, restrictAccess('admin', 'student'), bookLesson);
router.get('/lessons', checkAuth, restrictAccess('admin'), getAllLessons);
router.get('/lessons/:id', checkAuth, restrictAccess('admin'), lessonById);
router.patch('/lessons/:id', checkAuth, restrictAccess('admin'), updateLesson);
router.delete('/lessons/:id', checkAuth, restrictAccess('admin'), deleteLesson)



module.exports = router;