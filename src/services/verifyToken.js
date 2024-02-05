const jwt = require("jsonwebtoken");

function verifyAccessToken(token) {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        // Manejar el error de verificación aquí (puede ser un token inválido o expirado)
        console.error("Error al verificar el token de acceso:", error);
        return null; // o lanza una excepción según tus necesidades
    }
}

function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        // Manejar el error de verificación aquí (puede ser un token inválido o expirado)
        console.error("Error al verificar el token de actualización:", error);
        return null; // o lanza una excepción según tus necesidades
    }
}

module.exports = { verifyAccessToken, verifyRefreshToken };
