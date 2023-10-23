
const mongoose = require('mongoose')
const twilioSchema = new mongoose.Schema({
appointmentId: { type: mongoose.Schema.Types.ObjectId, 
        required: true, ref: "Appointment" },  
nom: {type:String}, 
prenom: {type:String},
numt : {type:String},
messageBody : {type: String},

})

module.exports = mongoose.model("sms",twilioSchema);