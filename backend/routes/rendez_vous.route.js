const express = require("express");
const router = express.Router();
const twilioController = require("../controllers/twilio.controller");
router.post("/:appointmentId/msgtwilio",twilioController.rendezVous);
module.exports = router;