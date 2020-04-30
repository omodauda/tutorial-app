const router = require("express").Router();
const { signUp, logIn } = require("../controllers/users");


//test route to make sure it is working (accessed at GET http://localhost:3000/tutorial-app/api/v1)
router.get('/tutorial-app/api/v1', function(req,res){
    res.json({message: "Welcome to tutorial app"});
});

// Register our routes
// router.use('/tutorial-app/api/v1', router);

router.post('/tutorial-app/api/v1/signup', signUp);
router.post('/tutorial-app/api/v1/login', logIn);

module.exports = router;