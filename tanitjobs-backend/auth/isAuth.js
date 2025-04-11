const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const users = require("../schema/userSchema");
const secret = process.env.JWT_SECRET;

exports.isAuth = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    const verify = jwt.verify(token, secret);

    const user = await users.findOne({ email: verify.email });
    if (!user) {
      res.status(400).send({ msg: "u r not authorized to do this action" });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).send({
      msg: "error while trying to authentificate u ",
      error: error.message,
    });
  }
};
