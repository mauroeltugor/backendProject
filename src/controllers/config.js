// config.js
module.exports = {
    mongoConnectionString: process.env.BD_CONNECTION_STRING || (() => { throw new Error("La variable de entorno BD_CONNECTION_STRING no está configurada."); })(),
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || (() => { throw new Error("La variable de entorno ACCESS_TOKEN_SECRET no está configurada."); })(),
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || (() => { throw new Error("La variable de entorno REFRESH_TOKEN_SECRET no está configurada."); })(),
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || "admin@localhost",
    ADMIN_USERNAME: process.env.ADMIN_USERNAME || "admin",
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "admin",
};


// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/apicompany";
// const SECRET = "yoursecretkey";

// const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@localhost";
// const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
// const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

