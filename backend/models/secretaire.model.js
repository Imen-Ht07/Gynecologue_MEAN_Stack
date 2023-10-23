const mongoose = require('mongoose')
const Role = require("../_helpers/role")

const secretaireSchema = new mongoose.Schema({
    userName: {type: String, required: true },
    password: {type: String, required: true },
    role: {type: String, default: Role.Secretaire},
})

module.exports = mongoose.model("secretaire", secretaireSchema);