const { User, Thoughts } = require('../models')

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thoughts.find()
      if(!thoughts){
        return res.status(404).json({message: 'No Thoughts Found'})
      }
      return res.status(200).json(thoughts)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  async getSingleThought(req, res) {
    try {
      const singleThought = await Thoughts.findOne({
        _id: req.params.thoughtID,
      })
      if (!singleThought) {
        return res.status(404).json({ message: 'Thought with specified ID not found' })
      }
      return res.status(200).json(singleThought)
    } catch (err) {
      return res.status(500).json(err)
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
      return res.status(200).json(newThought)
    } catch (err) {
      return res.status(500).json(err)
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
      return res.status(200).json(thought)
    } catch (err) {
      return res.status(500).json(err)
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
      return res.status(200).json(thought)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  async addReaction(req, res) {
    try {
      const reaction = await Thoughts.findOneAndUpdate(
        {_id: req.params.thoughtID},
        {$push: {reactions: req.body}},
        {new: true}
      )
      if(!reaction){
        return res.status(404).json({message: 'Thought not found'})
      }
      return res.status(200).json(reaction)
    } catch (err) {
      return res.status(500).json(err)
    }
  },
  async deleteReaction(req,res){
    try {
      const reaction = await Thoughts.findOneAndUpdate(
        {_id: req.params.thoughtID},
        {$pull: {reactions: { _id: req.body.reactionID}}},
        {new: true}
      )
      if(!reaction){
        return res.status(404).json({message: 'No reaction found with that ID'})
      }
      return res.status(200).json(reaction)
    } catch (err) {
      return res.status(500).json(err)
    }
  }
}
