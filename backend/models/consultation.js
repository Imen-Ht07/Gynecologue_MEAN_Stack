const mongoose = require('mongoose');
const Role = require("../_helpers/role")
const Schema = mongoose.Schema;

// Define collection and schema
let Consultation = new Schema({

   patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
    conclusion : { type: String },
    annexe: { type: String },
    timing: { type: String}
}, {
   timestamps: true,
   collection: 'consultaion'
})

module.exports = mongoose.model('Consultation', Consultation)