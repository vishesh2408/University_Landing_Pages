const mongoose = require('mongoose')

const LeadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  state: String,
  course: String,
  intake: String,
  consent: Boolean,
  univId: Number,
  createdAt: {type: Date, default: Date.now}
})

module.exports = mongoose.models.Lead || mongoose.model('Lead', LeadSchema)
