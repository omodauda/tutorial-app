const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = (req, res, next) => {
    const firstName = req.body.firstName;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    if (!firstName || !email || !password) {
        res.status(400).send({
            status: false,
            message: "All fields are required"
        })
        return;
    }

    User.findOne({email})
    .then(user => {
        if (user){
            return res
            .status(423)
            .send({status: false, message: "This email already exists"});
        }
    });

    if (role === "admin"){
        res.status(423).send({
            status: false,
            message: "You can't signup as an admin"
        })
        return;
    }

    bcrypt
    .hash(password, 12)
    .then(password => {
      let user = new User({
        firstName,
        email,
        password,
        role: role
      });
      return user.save();
    })
    .then(() => res.status(200).send({ status: true, message: "User registered successfully" }))
    .catch(err => console.log(err));
};


exports.logIn = (req, res, next) => {
    const firstName = req.body.firstName;
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
    .then(user => {
        if (!user) {
            return res
            .status(404)
            .send("User not found, please provide valid credentials");
        }
        // console.log(user);

        bcrypt.compare(password, user.password).then(valid => {
            if (!valid){
                return res
                .status(403)
                .send("Incorrect username or password, please review details and try again");
            }
            const token = jwt.sign(
                {_id: user.id},
                "somesecretkey",
                { expiresIn: "3hrs" }
            );
            res.status(200).send({
                _id: user._id,
                token
            });
        });
    })
    .catch(err => console.log(err));
}

exports.users = async (req, res, next) => {
    User.find({}, null, {sort: {firstName:1}})
    .then(user => {
        if (user){
            return res
            .status(200)
            .send(user);
        }
    })
};

exports.usersById = function (req, res, next) {
    const id = req.params.id;
    User.findById(id, function(err, foundUser){
        if(foundUser){
            res.send(foundUser);
        } else {
            res.send("no user matching that id was found");
        }
    });
    
}



exports.tutors = async (req, res, next) =>{
    console.log(req.query);
    let searchQuery = { }
    if (req.query.q) {
        const searchString = req.query.q.split(',').join(' ')
        searchQuery = ({ $text: { $search: searchString}})
    }
    const tutors = await User.find({role: "tutor"}).sort({ name: 1}).populate({
        path: 'Subjects_registered',
        select: '-__v'
    }).select('-__v')
    res.status(200).json({
        status: 'success',
        results: tutors.length,
        data: {
            data: tutors
        }
    })
}


exports.tutorById = function(req, res, next){
    const id = req.params.id;
    User.find({_id:id, role: "tutor"}, function(err, tutor){
        if(!tutor){
            res.send("no tutor matching the provided id found");
        }else{
            res.send(tutor);
        }
    })
}

exports.tutorToAdmin = function(req, res, next){
    const id = req.params.id;
    User.findByIdAndUpdate(id,{$set: {role: "admin" }}, function(err){
        if(!err){
            res.send("updated successfully");
        } else {
            res.send("update failed");
        }
    })
}

exports.deleteTutor = function(req, res, next) {
    const id = req.params.id;
    User.findOneAndDelete({_id:id, role:"tutor"}, function(err, tutor){
        if(tutor){
            res.send("tutor deleted successfully");
        }else {
            res.send("no tutor matching that id was found");
        }
    })
}

