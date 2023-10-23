const express = require("express");
const router = express.Router();
const msgController = require("../controllers/message.controller");

router.post("/new",msgController.saveMsg);
router.get("/",  msgController.getAllmsg);
router.get('/read/:id',  msgController.getMsg);
router.get('/getM',  msgController.countMsg);
router.delete('/delete/:id', msgController.deleteMsg);
router.put('/update/:id', msgController.updateMsg);

module.exports = router;