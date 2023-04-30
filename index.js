require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserRoute = require("./routes/userRoute");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/user", UserRoute);

// Route for signup
app.post('/signup', (req, res) => {
    const newUser = new User(req.body);
    newUser.save((err) => {
        if (err) {
            res.status(500).send('Error signing up new user');
        } else {
            res.send('User successfully signed up');
        }
    });
});

// Route for login
app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.status(500).send('Error logging in');
        } else {
            if (user) {
                if (user.password === req.body.password) {
                    res.send('User successfully logged in');
                } else {
                    res.send('Incorrect password');
                }
            } else {
                res.send('User not found');
            }
        }
    });
});

app.listen(process.env.PORT, () => {
  console.log("Server listining on port " + process.env.PORT);
  mongoose
    .connect(process.env.URL)
    .then((data) => {
      console.log("connect to database : ", data.connection.name);
    })
    .catch((err) => {
      console.log("Error : ", err);
    });
});
