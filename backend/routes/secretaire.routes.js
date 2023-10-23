const express = require("express");
const router = express.Router();
const secretaireController = require("../controllers/secretaire.controller");
router.post("/saveS", secretaireController.savesecretaire);
router.get("/findAll", secretaireController.findAll);
router.put("/update/:id", secretaireController.update);
router.delete("/delete/:id", secretaireController.delete);
router.get("/getS/:id", secretaireController.get);
module.exports = router;
