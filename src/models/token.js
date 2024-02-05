const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    id: { type: Object },
    token: { type: String, required: true },
});

const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;
