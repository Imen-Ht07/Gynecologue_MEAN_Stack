const express = require("express");
const router = express.Router();
const ordonnanceController = require("../controllers/ordonnance.controller");
router.post("/:patientId/create",ordonnanceController.saveOrd);
router.get("/patient/:patientId", ordonnanceController.getAllOrd);
router.put("/update/:id", ordonnanceController.updateOrd);
router.delete("/delete/:id", ordonnanceController.deleteOrd);
router.get('/read/:id',ordonnanceController.getOrd);
module.exports = router;
