const router = require('express').Router()
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtControllers')

router
  .route('/thoughts')
  .get(getThoughts)
router
  .route('/thoughts/:thoughtID')
  .get(getSingleThought)
  .post(createThought)
  .put(updateThought)
  .delete(deleteThought)
router
  .route('/thoughts/:thoughtID/reactions')
  .post(addReaction)
  .delete(deleteReaction)