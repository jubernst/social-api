const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  addReaction,
  removeReaction,
  deleteThought,
} = require("../../controllers/thoughtController");

// /api/thoughts
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reaction
router.route("/:thoughtId/reaction").post(addReaction);

// /api/thoughts/:thoughtId/reaction/:reactionId
router.route("/:thoughtId/reaction/:reactionId").delete(removeReaction);

module.exports = router;
