const router = require('express').Router()
const {
  getSingleUser,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userControllers')
router.route('/').get(getUsers).post(createUser)
router.route('/:userID').get(getSingleUser).put(updateUser).delete(deleteUser)
router.route('/:userID/friends/:friendID').post(addFriend).delete(deleteFriend)
module.exports = router
