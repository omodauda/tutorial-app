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

        bcrypt.compare(password, user.password).then(valid => {
            if (!valid){
                return res
                .status(403)
                .send("Incorrect username or password, please review details and try again");
            }
            const token = jwt.sign(
                { email: user.email, _id: user.id },
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

exports.users = (req, res, next) => {
    User.find()
    .then(user => {
        if (user){
            return res
            .status(200)
            .send(user);
        }
    })
}