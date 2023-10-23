// Carnet model
 const Carnet  = require('../models/Carnet')
// Add Carnet
exports.saveCarnet = (req, res, next) => {
    Carnet.create(
    {...req.body, 
    patientId: req.params.patientId,
  },
      (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
}

// Get All Carnets for a specific user
exports.listCarnet =(req, res, next) => {
  Carnet.find(
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

// Get single Carnet
exports.carnetID =(req, res) => {
  Carnet.findOne({
    _id: req.params.id,
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
};

// Update Carnet
exports.updateCarnet =(req, res, next) => {
    Carnet.findByIdAndUpdate(
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
// Delete a carnet by id
exports.deleteCarnet =(req, res) => {
  Carnet.findByIdAndDelete(req.params.id, (err, message) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!message) {
      res.status(404).json({ error: 'Message not found' });
    } else {
      res.status(200).json({ message: 'Message deleted successfully' });
    }
  });
};

