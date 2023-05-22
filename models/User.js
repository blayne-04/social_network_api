const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^([a-zd_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectID,
        ref: 'thoughts',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectID,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
)

userSchema.virtual('friendCount').get(function () {
  return this.friends.length
})

const User = model('user', userSchema)

module.exports = User
