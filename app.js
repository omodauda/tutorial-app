const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.get('/', function(req,res){
    res.json({message: "Welcome to tutorial app"});
});

app.listen(3000, function(){
    console.log("server running on port 3000!")
})