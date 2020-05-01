const router = require("express").Router();
const { signUp, logIn, users } = require("../controllers/users");

const { createCategory, getAllCategories} = require('../controllers/category');
const { createSubject, getAllSubjects} = require('../controllers/subject');


//test route to make sure it is working (accessed at GET http://localhost:3000/tutorial-app/api/v1)
router.get('/tutorial-app/api/v1', function(req,res){
    res.json({message: "Welcome to tutorial app"});
});

// Register our routes
// router.use('/tutorial-app/api/v1', router);

router.post('/signup', signUp);
router.post('/login', logIn);

router.get('/users', users);

//category routes

router.post('/categories', createCategory);
router.get('/categories', getAllCategories);

//subject routes
router.post('/Subjects', createSubject);
router.get('/Subjects', getAllSubjects);



module.exports = router;