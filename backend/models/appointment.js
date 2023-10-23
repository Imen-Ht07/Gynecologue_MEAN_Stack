const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  numt: { type: String, required: true },
  date: { type: String, required: true },
  motif: { type: String, required: true },
  status: { type: String, enum: ['valid', 'invalid'], default: 'invalid' }, // Add status field
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
