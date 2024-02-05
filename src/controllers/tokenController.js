const getTokenFromHeader = require('../utils/getTokenFromHeader');
const Token = require('../models/token'); // Asumiendo que ya tienes un modelo de Token
const { jsonResponse } = require('../controllers/jsonResponse');

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
