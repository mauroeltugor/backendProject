const mongoose = require("mongoose");

const reserSchema = new mongoose.Schema({
 
  nombre: {
    type: String,
    required: true,
  },
  telefono: {
    type: Number,
    required: true,
  },
  vehiculo: {
    type: String,
    required: true,
  },
  año: { 
    type: Number,
    required: true,
  },
  fecha: {
    type: String,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },

  asientosReservados: [{
    numero: {
      type: Number,
      required: true,
    },
    ocupado: {
      type: Boolean,
      default: false,
    },
  }],
});

const Reserva = mongoose.model("Reserva", reserSchema);
module.exports = Reserva;

