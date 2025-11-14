const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  code: String,
  name: String,
  fees: {
    min: String,
    max: String
  },
  details: String
}, {_id:false})

const UniversitySchema = new mongoose.Schema({
  univId: { type: Number, unique: true },
  name: String,
  overview: String,
  courses: [CourseSchema],
  placements: String,
  facilities: [String],
  brochureUrl: String,
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.models.University || mongoose.model('University', UniversitySchema)
