
const secretaire = require('../models/secretaire.model');
const bcrypt = require("bcryptjs");

exports.savesecretaire = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newSec = new secretaire({ 
      userName: req.body.userName,
      password: hashedPassword
    });
    await newSec.save();
  res.status(200).json("Secretaire succeffuly added");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//get all
    exports.findAll = (req, res) => {
        secretaire.find({}).exec(function (err, secretaire) {
            if (err) {
                console.error("erreur");
            } else {
                res.json(secretaire);
            }
        });
    }
//update
    exports.update = (req,res) => {
        secretaire.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
              .then((secretaire) => {
                  res.status(200).send("modification avec succes")
              })
              .catch((error) => { console.log(error) });
      };
//delete
      exports.delete = (req, res) => {
        secretaire.findOneAndDelete({ _id: req.params.id })
              .then((data) => {
                  res.status(200).json("Deleted...")
              })
              .catch((error) => { console.log(error) });
      };
//get by Id
      exports.get = (req, res) => {
        //let secretaireId = req.params.secretaireId;
        secretaire.findById({ _id: req.params.id })
            .then((secretaire) => {
                res.status(200).send(secretaire)
            })
            .catch((error) => { console.log(error) });
    };

    