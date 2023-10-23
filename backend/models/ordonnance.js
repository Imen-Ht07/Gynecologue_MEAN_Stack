const mongoose = require('mongoose');
const ordonanceSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },
  nom: {
    type: String
  },
  prenom: {
    type: String
  },
  date: {
    type: String
  },
  traitement: {
    type: String
  },
  
})

module.exports = mongoose.model("ordonnance", ordonanceSchema);