const jwt = require("jsonwebtoken");
const User = require('../models/users');


exports.checkAuth = async(req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "somesecretkey");
        
        req.userData = await User.findById(decoded._id)
        next();
    }
    catch(error){
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}

exports.restrictAccess = function(...allowedRoles) {
    return (req, res, next) => {
      if (!allowedRoles.includes(req.userData.role)) {
        return next(
          new Error('You do not have permission to perform this action')
        );
      }
      next();
    };
  };








