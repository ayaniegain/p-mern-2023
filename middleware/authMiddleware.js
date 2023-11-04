const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel");

//Protected Routes token base
const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRECT_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
//admin acceess

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    // console.log(user)
    if (user.role !== 1) {
        res.status(401).send({
            success: false,
            error,
            message: "UnAuthorized Access",
        });
    } else {
        // console.log(user)
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};

module.exports = { requireSignIn, isAdmin };