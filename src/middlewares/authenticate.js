const { jsonResponse } = require("../controllers/jsonResponse");
const getTokenFromHeader = require("../../src/utils/getTokenFromHeader");
const { verifyAccessToken } = require("../../src/services/verifyToken");

// Función que verifica si el usuario tiene el rol necesario
const checkRole = (...requiredRoles) => (req, res, next) => {
    const userRoles = req.user.roles || [];
    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

    if (hasRequiredRole) {
        next();
    } else {
        res.status(403).json(jsonResponse(403, { message: `Acceso prohibido. Se requiere uno de los roles: ${requiredRoles.join(', ')}.` }));
    }
};

// Función de autenticación
async function authenticate(req, res, next) {
    const token = getTokenFromHeader(req.headers);

    if (token) {
        try {
            const decoded = await verifyAccessToken(token);

            if (decoded) {
                req.user = decoded;
                next();
            } else {
                next({ status: 403, message: "Token inválido" });
            }
        } catch (error) {
            next(error);
        }
    } else {
        next({ status: 401, message: "No hay token" });
    }
}

module.exports = { authenticate, checkRole };
