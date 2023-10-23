// consultation model
const Consultation = require('../models/consultation');
const path = require('path');

// Add consultation
exports.saveConsult = (req, res, next) => {
  Consultation.create(
    {
      ...req.body,
      patientId: req.params.patientId,
      annexe: req.file ? path.join('/uploads', req.file.filename) : null
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
};

// Update consultation
exports.updateConsult = (req, res, next) => {
  const updatedData = {
    ...req.body
  };
  if (req.file) {
    updatedData.annexe = path.join('/uploads', req.file.filename);
  }

  Consultation.findByIdAndUpdate(
    req.params.id,
    {
      $set: updatedData,
    },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
};
// Get All consultations
exports.getAllconsult= (req, res,  next) => {
  Consultation.find(
    { patientId: req.params.patientId },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
};

// Get single consultation
exports.getConsult = (req, res) => {
    Consultation.findOne({
    _id: req.params.id,
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Delete a consultation by id
exports.deleteConsult = (req, res) => {
  Consultation.findByIdAndDelete(req.params.id, (err, message) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!message) {
      res.status(404).json({ error: 'consultation not found' });
    } else {
      res.status(200).json({ message: 'consultation deleted successfully' });
    }
  });
}; 
