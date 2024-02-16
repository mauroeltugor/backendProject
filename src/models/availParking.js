const mongoose = require("mongoose");

const parqueaderoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  longitud: {
    type: Number,
    required: true,
  },
  latitud: {
    type: Number,
    required: true,
  }
});

const Parqueadero = mongoose.model("Parqueadero", parqueaderoSchema);
module.exports = Parqueadero;
