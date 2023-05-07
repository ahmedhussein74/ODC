const router = require("express").Router();

const {
  getCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
} = require("../controllers/cardController");

router.route("/").get(getCards).post(createCard);
router.route("/:id").get(getCard).put(updateCard).delete(deleteCard);

module.exports = router;
