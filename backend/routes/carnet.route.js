const express = require("express");
const router = express.Router();
const carnetController = require("../controllers/carnet.controller");
router.post("/:patientId/create",carnetController.saveCarnet);
router.get("/patient/:patientId", carnetController.listCarnet);
router.put("/update/:id", carnetController.updateCarnet);
router.delete("/delete/:id", carnetController.deleteCarnet);
router.get('/read/:id',carnetController.carnetID);
module.exports = router;
