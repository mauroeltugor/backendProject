
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
 
  title: {
    type: String,
    required: true,
  },
  content: {
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
  },
  puestos: {
    type: Number,
    required: true,
  },
  estado: {
    type: Boolean,
    required: true
  }
});

const Post = mongoose.model("parqueaderos", postSchema);
module.exports = Post;


