require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("./userModel");
const jwt = require("jsonwebtoken");

// Route for signup
exports.signup = async (req, res) => {
  // 1- create user
  const user = await User.create(req.body);

  // 2- generate tokent
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.JWT_EXPIRE_TIME,
  });

  res.json({ data: user, token });
};

// Route for login
exports.login = async (req, res) => {
  // 1- check if email is exist
  const user = await User.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return Error("Envalid Email or Password");
  }

  // 2- generate tokent
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  res.json({ data: user, token });
};
