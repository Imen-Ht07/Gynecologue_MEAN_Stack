
// Carnet model
const Ordonance  = require('../models/ordonnance')

// Add Ordonnance
exports.saveOrd =(req, res, next) => {
    Ordonance.create(
    {...req.body, 
    patientId: req.params.patientId,
  },
      (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)    }
  })
}


// Get All ordonance for a specific user
exports.getAllOrd =(req, res, next) => {
  Ordonance.find(
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
// Get single Ord
exports.getOrd =(req, res) => {
  Ordonance.findOne({
    _id: req.params.id,
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Update Ordonnance
exports.updateOrd =(req, res, next) => {
    Ordonance.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log('Data updated successfully')
      }
    },
  )
}
// Delete a Ordonnance by id
exports.deleteOrd =(req, res) => {
  Ordonance.findByIdAndDelete(req.params.id, (err, message) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!message) {
      res.status(404).json({ error: 'Message not found' });
    } else {
      res.status(200).json({ message: 'Message deleted successfully' });
    }
  });
};