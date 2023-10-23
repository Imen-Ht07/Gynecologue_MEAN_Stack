const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Carnet = new Schema({
    nom: {
      type: String
   },
   prenom: {
      type: String
   },
   adresse: {
      type: String
   },
   naissance: {
      type: String
   },
   nationalite: {
      type: String
   },
   Cin: {
      type: String
   },
   niv_inst: {
      type: String
   },
   occupation: {
      type: String
   },
   tel: {
      type: Number
   },
   couv: {
      type: String
   },
   num_c: {
      type: Number
   },
   sang: {
      type: String
   },
   rhesus: {
      type: String
   },
   type_allergie: {
      type: String
   },
   declaree_allergie: {
      type: String
   },
   traitement: {
      type: String
   },
   med_tret: {
      type: String
   },
   age_pub: {
      type: Number
   },
   prob: {
      type: String
   },
   maladie: {
      type: String
   },
   maladieF: {
      type: String
   },
   type_handicap: {
      type: String
   },
   declaree_handicap: {
      type: String
   },
   date_vaccin1: {
      type: String
   },
   lieu_vaccin1: {
      type: String
   },
   date_vaccin2: {
      type: String
   },
   lieu_vaccin2: {
      type: String
   },
   date_vaccin3: {
      type: String
   },
   lieu_vaccin3: {
      type: String
   },
   date_vaccin4: {
      type: String
   },
   lieu_vaccin4: {
      type: String
   },
   date_vaccin5: {
      type: String
   },
   lieu_vaccin5: {
      type: String
   },
   date_rubeole: {
      type: String   
   },
   lieu_rubeole: {
      type: String
   },
   autre_vaccin: {
      type: String
   },
   nomM: {
      type: String
   },
   prenomM: {
      type: String
   },
   telM: {
      type: Number
   },
patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
}, {
   timestamps: true,
   collection: 'carnets'
})

module.exports = mongoose.model('Carnet', Carnet)