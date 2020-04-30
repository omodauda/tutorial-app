const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Routes for API
const router = express.Router();

//test route to make sure it is working (accessed at GET http://localhost:3000/tutorial-app/api/v1)
router.get('/', function(req,res){
    res.json({message: "Welcome to tutorial app"});
});


//Register our routes
app.use('/tutorial-app/api/v1', router);



app.listen(3000, function(){
    console.log("server running on port 3000!")
})