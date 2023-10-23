const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    mess: { type: String, required: true },
});
Message = mongoose.model('Message', messageSchema);

module.exports = Message;
