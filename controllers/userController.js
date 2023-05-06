require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: `Error: ${error}` });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch {
    res.status(404).json({ message: "User not found" });
  }
};

const createUser = async (req, res) => {
  if (await User.findOne({ email: req.body.email })) {
    res.status(400).json({ message: "Email is already registed" });
  } else {
    const user = await User.create(req.body);
    res.status(200).json(user);
  }
};

const updateUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(400).json({ message: `Error: ${error}` });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User is deleted" });
  } catch (error) {
    res.status(400).json({ message: `Error: ${error}` });
  }
};

const signup = async (req, res) => {
  if (await User.findOne({ email: req.body.email })) {
    res.status(400).json({ message: "Email is already registed" });
  } else {
    const user = await User.create(req.body);
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });
    res.status(200).json({ data: user, token });
  }
};

const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    res.status(400).json({ message: "Wrong Email or Password" });
  } else {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });
    res.status(200).json({ data: user, token });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  signup,
  login,
};
