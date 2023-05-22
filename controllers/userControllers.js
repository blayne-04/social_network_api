const { User } = require('../models')

module.exports = {
  async getUsers(req, res) {
    try {
      const Users = await User.find()
      res.status(200).json(Users)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async getSingleUser(req, res) {
    try {
      const singleUser = await User.findOne({ _id: req.params.userID })
      if (!singleUser) {
        return res.status(404).json({ message: 'No User Found With That ID' })
      }
      res.status(200).json(singleUser)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async createUser(req, res) {
    try {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        thoughts: [],
        friends: [],
      })
      await newUser.save()
      res.status(200).json(newUser)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.userID },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      if (!updatedUser) {
        return res.status(404).json({ message: 'No user found with that ID' })
      }
      res.json(updatedUser)
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async deleteUser(req, res) {
    try {
      const deleteUser = await User.findOneAndRemove({ _id: req.params.userID })

      if (!deleteUser) {
        return res.status(404).josn({ message: 'No user found with that ID' })
      }

      res.status(200).json({ message: 'User Deleted' })
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userID },
        { $addToSet: { friends: req.params.friendID } },
        { runValidators: true, new: true }
      )
      const friend = await User.findOneAndUpdate(
        { _id: req.params.friendID },
        { $addToSet: { friends: req.params.userID } },
        { runValidators: true, new: true }
      )
      if (!user || !friend) {
        return res
          .status(404)
          .json({ message: 'No user or friend found with that ID' })
      }
      res
        .status(200)
        .json({ user, friend, message: 'Friendship Status Updated' })
    } catch (err) {
      res.status(500).json(err)
    }
  },
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userID },
        { $pull: { friends: req.params.friendID } },
        { new: true }
      )
      const friend = await User.findOneAndUpdate(
        { _id: req.params.friendID },
        { $pull: { friends: req.params.userID } },
        { new: true }
      )
      if (!user || !friend) {
        res
          .status(404)
          .json({ message: 'No user or friend found with that ID' })
      }
      res.status(200).json({ user, friend, message: 'Friendship Terminated' })
    } catch (err) {
      res.status(500).json(err)
    }
  },
}
