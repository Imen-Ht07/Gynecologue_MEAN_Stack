const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
const consultationController = require("../controllers/consultation.controller");

router.post("/:patientId/create", upload.single('annexe'), consultationController.saveConsult);
router.get("/read/:id", consultationController.getConsult);
router.get('/patient/:patientId', consultationController.getAllconsult);
router.put("/update/:id", upload.single('annexe'), consultationController.updateConsult);
router.delete("/delete/:id", consultationController.deleteConsult);

module.exports = router;