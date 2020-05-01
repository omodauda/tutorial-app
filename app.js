const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require("./routes/route");


const app = express();

mongoose
    .connect(
        "mongodb+srv://admin-babslaw:babalola1996@cluster0-hthp7.mongodb.net/tutorialDB",
        {useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then (result => {
        console.log("Database connected!")
    })
    .catch (err => {
        console.log(err)
    });

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/tutorial-app/api/v1', authRoutes);




app.listen(3000, function(){
    console.log("server running on port 3000!")
});


