const express = require('express');
const reservaController = require('../controllers/reservaController');
const router = express.Router();

router.post("/", reservaController.createReserva);
router.get("/", reservaController.getAllReservas);
router.put("/:id", reservaController.updateReserva);
router.get("/:id", reservaController.getReservaById);
router.delete("/:id", reservaController.deleteReserva);

module.exports = router;