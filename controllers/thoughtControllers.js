const { User } = require('../models')
const { Thoughts } = require('../models/Thoughts')

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find()
      res.status(200).json(thoughts)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async getSingleThought(req, res) {
    try {
      const singleThought = await Thoughts.findOne({
        _id: req.params.thoughtID,
      })
      if (!singleThought) {
        res.status(404).json({ message: 'Thought with specified ID not found' })
      }
      res.status(200).json(singleThought)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async createThought(req, res) {
    try {
      const newThought = new Thoughts({
        thoughtText: req.body.text,
        username: req.body.username,
        userID: req.body.userID,
      })
      await newThought.save()
      await User.findOneAndUpdate(
        { _id: req.body.userID },
        { $push: { thoughts: newThought._id } },
        { new: true }
      )
      res.status(200).json(newThought)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtID },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' })
      }
      res.status(200).json(thought)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thoughts.findOneAndRemove({
        _id: req.params.thoughtID,
      })
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' })
      }
      res.status(200).json(thought)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async addReaction(req, res) {
    try {
      const reaction = await Thoughts.findOneAndUpdate(
        {_id: req.params.thoughtID},
        {$push: {reactions: req.body.reacData}}
      )
      if(!reaction){
        res.status(404).json({message: 'Thought not found'})
      }
      res.status(200).json(reaction)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async deleteReaction(req,res){
    try {
      const reaction = await Thoughts.findOneAndUpdate(
        {_id: req.params.thoughtID},
        {$pull: {reactions: req.body.reacID}}
      )
      if(!reaction){
        return res.status(404).json({message: 'No reaction found with that ID'})
      }
      res.status(200).json({message: 'Reaction Deleted'})
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
