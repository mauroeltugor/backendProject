const getTokenFromHeader = require('../utils/getTokenFromHeader');
const { jsonResponse } = require('../controllers/jsonResponse');
const Token = require('../models/token');
const verifyRefreshToken = require('../services/verifyToken');
const { generateAccessToken } = require('../services/generateTokens');

exports.refreshToken = async (req, res) => {
    const refreshToken = getTokenFromHeader(req.headers);

    if (refreshToken) {
        try {
            const found = await Token.findOne({ token: refreshToken });

            if (!found) {
                return res.status(401).send(jsonResponse(401, { error: 'Unauthorized' }));
            }

            const payload = verifyRefreshToken(found.token);

            if (payload) {
                const accessToken = generateAccessToken(payload.use);
                return res.status(200).json(jsonResponse(200, { accessToken }));
            } else {
                return res.status(401).send(jsonResponse(401, { error: 'Unauthorized' }));
            }
        } catch (error) {
            return res.status(401).send(jsonResponse(401, { error: 'Unauthorized' }));
        }
    } else {
        res.status(401).send(jsonResponse(401, { error: 'Unauthorized' }));
    }
};
