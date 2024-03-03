const Post = require('../models/post.js');
const Parqueadero = require('../models/availParking.js');

async function createPost(req, res) {
  
  try {
    // Conectar a la base de datos
    
    // Consultar la colección de parqueaderos
    const { longitud, latitud } = req.body;

  const parqueaderos = await Parqueadero.find();

  let parqueaderoExistente = false;

// Verificar si hay coincidencias de coordenadas
  for (let i = 0; i < parqueaderos.length; i++) {
    if (parqueaderos[i].longitud === longitud && parqueaderos[i].latitud === latitud) {
      parqueaderoExistente = true;
      break; // Salir del bucle una vez que se encuentra una coincidencia
  }
}

  if (parqueaderoExistente) {
    console.log("El parqueadero existe");
  } else {
    console.log("El parqueadero no existe");
}

    if (!parqueaderoExistente) {
      console.log("Error: Las coordenadas no coinciden");
      return res.status(400).send("Las coordenadas proporcionadas no coinciden con un parqueadero existente.");
    }

    // Si las coordenadas son válidas, crear el post
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      longitud: req.body.longitud,
      latitud: req.body.latitud,
      puestos: req.body.puestos,
    });

    await post.save();
    res.send(post);
  } catch (error) {
    console.error('Error al crear el post:', error);
    res.status(500).send(error);
  }
}

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function updatePost(req, res) {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        longitud: req.body.longitud,
        latitud: req.body.latitud,
        puestos: req.body.puestos,
      },
      { new: true }
    );
    if (!post) return res.status(404).send("Post not found");
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getPostById(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deletePost(req, res) {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  getPostById,
  deletePost
};


/*{
  "title": "Centro",
  "content": "Contenido de prueba",
  "latitud": -75.667875,
  "longitud": 4.5406386,
  "puestos": 10
}*/