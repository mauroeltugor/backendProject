const Token = require('../models/token');
const { jsonResponse } = require('./jsonResponse');
const getTokenFromHeader = require('../utils/getTokenFromHeader');

exports.deleteToken = async (req, res) => {
    try {
        const refreshToken = getTokenFromHeader(req.headers);

        if (refreshToken) {
            await Token.findOneAndRemove({ token: refreshToken });
            res.status(200).json(jsonResponse(200, { message: 'Token eliminado exitosamente.' }));
        } else {
            res.status(400).json(jsonResponse(400, { error: 'Token no proporcionado en el encabezado.' }));
        }
    } catch (error) {
        console.error(error);
        res.status(500).json(jsonResponse(500, { error: 'Error interno del servidor.' }));
    }
};
