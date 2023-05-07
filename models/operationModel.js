const mongoose = require("mongoose");

const childSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Operation", childSchema);
