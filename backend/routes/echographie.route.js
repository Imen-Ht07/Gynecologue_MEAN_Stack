const express = require("express");
const router = express.Router();
const multer = require('../middleware/multer');
const ecoController = require("../controllers/echographie.controller");
//routers
router.post('/:patientId/new',multer.upload.single('dicom'),ecoController.saveEco);
router.get("/eco/:patientId",  ecoController.listEco);
router.get("/:id", ecoController.getOneEco);
router.delete("/:id",  ecoController.deleteEco);
router.patch("/:id", ecoController.updateEco);

module.exports = router;