const { Schema, model } = require('mongoose')

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => Schema.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (time) => {
      if (time) {
        return new Date(time).toLocaleString()
      }
    },
  },
})
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (time) => {
        if (time) {
          return new Date(time).toLocaleString()
        }
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
)

thoughtsSchema.virtual('reactionCount').get(function () {
  return this.reactions.length
})
const Thoughts = model('thoughts', thoughtsSchema)

module.exports = Thoughts
