const Card = require("../models/cardModel");

const getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const getCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    res.status(200).json(card);
  } catch {
    res.status(404).json({ message: "Card not found" });
  }
};

const createCard = async (req, res) => {
  try {
    const card = await Card.create(req.body);
    res.status(200).json(card);
  } catch (err) {
    res.status(403).json({ message: err });
  }
};

const updateCard = async (req, res) => {
  try {
    await Card.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Card updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const deleteCard = async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Card is deleted" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

module.exports = {
  getCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
};
