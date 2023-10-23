const Message = require('../models/message');

// Get all messages
exports.getAllmsg = (req, res) => {
  Message.find((err, messages) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(messages);
    }
  });
};
// Get single msg
exports.getMsg = (req, res) => {
  Message.findById(req.params.id, (err, messages) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(messages);
    }
  });
};

//fonction count
exports.countMsg = (req,res) => {
  Message.count({}).exec(function(err, st) {
      if (st == 0 && err) {
        res.json("Pas de messages", err);
      } else {
        res.json(st); 
      }
    });
};

// Add new message
exports.saveMsg =  (req, res) => {
    const message = new Message({
      ...req.body,
    });
    message.save()
    .then(() => {
        res.status(200).json({ message: 'Message submitted successfully!' });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
// Update msg
exports.updateMsg = (req, res) => {
  Message.findByIdAndUpdate(
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
// Delete a message by id
exports.deleteMsg = (req, res) => {
  Message.findByIdAndDelete(req.params.id, (err, message) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!message) {
      res.status(404).json({ error: 'Message not found' });
    } else {
      res.status(200).json({ message: 'Message deleted successfully' });
    }
  });
};
