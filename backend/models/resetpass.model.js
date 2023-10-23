const mongoose = require("mongoose");

const resettokenSchema = new mongoose.Schema({
  patienteId: { type: mongoose.Schema.Types.ObjectId, 
                required: true, ref: "patiente" },
  resettoken: { type: String, 
                required: true },
  createdAt: { type: Date,
               required: true, 
               default: Date.now ,  
               expires: 3600},
});

module.exports = mongoose.model("PasswordResetToken", resettokenSchema);