const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

function generate3RandomNumbers() {
  const randomNumbers = [];
  for (let i = 0; i < 3; i++) {
    randomNumbers.push(Math.floor(Math.random() * 100)); // generates a random number between 0 and 99
  }
  return randomNumbers.join("");
}

function generateCreditCardNumber() {
  const creditCardNumber = [];
  for (let i = 0; i < 16; i++) {
    creditCardNumber.push(Math.floor(Math.random() * 10)); // generates a random number between 0 and 9
  }
  return creditCardNumber.join(""); // converts the array into a string
}

const cardSchema = new mongoose.Schema({
  CVV: {
    type: String,
    maxlength: 3,
    unique: true,
    minlength: 3,
  },
  creditNumber: {
    type: String,
    maxlength: 16,
    unique: true,
    minlength: 16,
  },
  expirationDate: {
    type: Date,
    default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Child",
  },
});

cardSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.CVV = generate3RandomNumbers();
  this.CVV = await bcrypt.hash(this.CVV, salt);
  this.creditNumber = generateCreditCardNumber();
  next();
});

module.exports = mongoose.model("Card", cardSchema);
