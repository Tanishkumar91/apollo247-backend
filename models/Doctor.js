const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: String,
  experience: Number,
  qualifications: String,
  location: String,
  fees: Number,
  cashback: String,
  rating: String,
  availableIn: String,
  doctorOfTheHour: Boolean,
  image: {
    type: "/doctor-placeholder.jpeg",
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);
