const Post = require('../models/post.js');
const Parqueadero = require('../models/availParking.js');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user : "parkinlocation753@gmail.com",
    pass: "rvhe hydp zxzo arvt",
  },
});

// Función para enviar correo electrónico
async function sendEmail(post) {
  try {
    const correoHTML = `
      <h2>Nueva inserción de post</h2>
      <p><strong>Título:</strong> ${post.title}</p>
      <p><strong>Contenido:</strong> ${post.content}</p>
      <p><strong>Longitud:</strong> ${post.longitud}</p>
      <p><strong>Latitud:</strong> ${post.latitud}</p>
      <p><strong>Puestos:</strong> ${post.puestos}</p>
    `;

    const mailOptions = {
      from: 'parkinlocation753@gmail.com',
      to: 'parkinlocation753@gmail.com',
      subject: 'Nueva inserción de post',
      html: correoHTML,
    };

    await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado correctamente');
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
}

// Ruta para crear un nuevo post
const createPost = async (req, res) => {
  try {
    const { longitud, latitud } = req.body;

    const parqueaderos = await Parqueadero.find();

    let parqueaderoExistente = false;

    for (let i = 0; i < parqueaderos.length; i++) {
      if (parqueaderos[i].longitud === longitud && parqueaderos[i].latitud === latitud) {
        parqueaderoExistente = true;
        break;
      }
    }

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      longitud: req.body.longitud,
      latitud: req.body.latitud,
      puestos: req.body.puestos,
      estado: parqueaderoExistente
    });

    await post.save();

    if (!parqueaderoExistente) {
      await sendEmail(post);
    }

    res.send(post);
  } catch (error) {
    console.error('Error al crear el post:', error);
    res.status(500).send(error);
  }
};

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