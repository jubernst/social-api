const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route("/:thoughtId").get(getSingleThought);

module.exports = router;
