const express = require("express");
const router = express.Router();
const appointementController = require("../controllers/appointement.controller");

router.post("/new",appointementController.saveAppointment);
router.get("/",  appointementController.AppointmentAll);
router.get("/getA",  appointementController.countAppointment);
router.get("/getById/:id", appointementController.getID);
router.delete("/destroy", appointementController.deleteAppointment);
module.exports = router;