const Eco = require('../models/echographie');

// Get all echographies
exports.listEco = (req, res, next) => {
  Eco.find({ patientId: req.params.patientId }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Save an Eco
exports.saveEco =  (req, res, next) => {
    // Check if the DICOM file has been sent in the request
      if (!req.file) {
        return res.status(400).json({
          ok: false,
          message: "Please select a DICOM file.",
        });
      } 

  // Création d'un nouvel objet carnet à partir des données de la requête
  const echographie = new Eco({
    dicom: req.file.path, // Chemin du fichier DICOM dans le système de fichiers
    ...req.body,
    patientId: req.params.patientId,
  });

 // Sauvegarde du carnet dans la base de données
 echographie.save((err, newEco) => {
  if (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      message: "Une erreur est survenue lors de la sauvegarde.",
    });
  }

    // Envoi de la réponse avec les données du carnet créé
    res.status(201).json({
      ok: true,
      message: "Le carnet a été créé avec succès.",
      echographie: newEco,
    });
  });
};

// Update an Eco
exports.updateEco = async (req, res) => {
  if (req.body.title != null) {
    res.echographie.title = req.body.title;
  }
  if (req.body.description != null) {
    res.echographie.description = req.body.description;
  }
  if (req.body.content != null) {
    res.echographie.content = req.body.content;
  }
  if (req.file != null) {
    res.echographie.dicom = req.file.filename;
  }

  try {
    const updatedEco = await res.echographie.save();
    res.json(updatedEco);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an Eco
exports.deleteEco = async (req, res) => {
  try {
    await res.echographie.remove();
    res.json({ message: 'Eco deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get one Eco
exports.getOneEco = async (req, res, next) => {
  let echographie;
  try {
    echographie = await Eco.findById(req.params.id);
    if (echographie == null) {
      return res.status(404).json({ message: 'Cannot find Eco' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.echographie = echographie;
  next();
};
