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
  longitud: { // Corregido el nombre del campo de longuitud a longitud
    type: Number,
    required: true,
  },
  latitud: { // Corregido el nombre del campo de latitud
    type: Number,
    required: true,
  }
});

export const Post = mongoose.model("Post", postSchema);