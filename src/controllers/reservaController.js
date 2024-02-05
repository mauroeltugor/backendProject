const Reserva = require('../models/reserva.js');

async function createReserva(req, res) {
  try {
    const reserva = new Reserva({
      nombre: req.body.nombre,
      telefono: req.body.telefono,
      vehiculo: req.body.vehiculo,
      año: req.body.año,     fecha: req.body.fecha,
      hora: req.body.hora,
      asientosReservados: req.body.asientosReservados  || []
    });
    await reserva.save();

    res.send(reserva);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getAllReservas(req, res) {
  try {
    const reservas = await Reserva.find();
    res.send(reservas);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updateReserva(req, res) {
  try {
    const reserva = await Reserva.findByIdAndUpdate(
      req.params.id,
      {
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        vehiculo: req.body.vehiculo,
        año: req.body.año,
        fecha: req.body.fecha,
        hora: req.body.hora,
        asientosReservados: req.body.asientosReservados || []
      },
      { new: true }
    );
    if (!reserva) return res.status(404).send("Reserva not found");
    res.send(reserva);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getReservaById(req, res) {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) return res.status(404).send("Reserva not found");
    res.send(reserva);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteReserva(req, res) {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) return res.status(404).send("Reserva not found");
    res.send(reserva);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  createReserva,
  getAllReservas,
  updateReserva,
  getReservaById,
  deleteReserva
};