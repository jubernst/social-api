const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  addFriend,
  removeFriend,
  deleteUser,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).post(updateUser).delete(deleteUser);

// /api/users/:userId/:friendId
router.route("/:userId/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
