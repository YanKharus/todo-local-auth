const mongoose = require('mongoose')

const TimeBlockSchema = new mongoose.Schema({
  session: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('TimeBlock', TimeBlockSchema)
