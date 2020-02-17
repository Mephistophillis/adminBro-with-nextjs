const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ClothSchema = new Schema(
  {
    title: String,
    img: {
      type: Schema.Types.ObjectId,
      ref: 'Uploads',
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Cloth', ClothSchema)
