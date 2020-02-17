const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UploadsSchema = new Schema({
  path: String,
  filename: String,
  mimeType: String,
  size: Number,
})

module.exports = mongoose.model('Uploads', UploadsSchema)
