// routes/tokenRoutes.js
const express = require('express');
const router = express.Router();
const tokenController = require('../controllers/tokenController');

router.delete('/', tokenController.deleteToken);

module.exports = router;
