const router = require("express").Router();
const {
  getReaction,
  createReaction,
  deleteReaction,
} = require("../../controllers/reactionController");

// /api/reaction
router.route("/").get(getReaction).post(createReaction);

module.exports = router;
