const mongoose = require('mongoose')
const Role = require("../_helpers/role")

const patienteSchema = new mongoose.Schema({
        userName: {type: String, required: true },
        nomP: {type: String, required: true },
        prenomP: {type: String, required: true },
        tel: {type: Number, required: true },
        email: {type:String, required: true },
        naissance: {type: String, required: true },
        password: {type: String, required: true },
        role: {type: String, default: Role.Patiente},
    })
module.exports = mongoose.model("patiente", patienteSchema);
