
const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const passController = require("../controllers/forgetpass.controller");
const authJwt= require("../middleware/authJWT");
router.post("/signup", authController.signup);
router.post("/signin", authController.signin) ;
router.post("/signout", authController.signout) ;
//sessions
router.get("/all", authController.allAccess);
router.get("/patiente", [authJwt.verifyToken,authJwt.isPatiente], authController.patienteBoard);
router.get("/secretaire",[authJwt.verifyToken, authJwt.isSecretaire],authController.secretaireBoard);
router.get("/docteur",[authJwt.verifyToken, authJwt.isDocteur],authController.docteurBoard);
  
//resetPassword
router.post("/ResetPassword", passController.ResetPassword);
router.get("/ValidPasswordToken/:patienteId/:resettoken", passController.ValidPasswordToken);
router.post("/NewPassword/:patienteId/:resettoken", passController.NewPassword);
router.get("/profile", authJwt.verifyToken, authController.getCurrentUserProfile);
module.exports = router;