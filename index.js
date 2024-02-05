const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { authenticate, checkRole } = require("./src/middlewares/authenticate");
const crypto = require("crypto");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.set("json spaces", 4);
app.use(express.urlencoded({ extended: true }));

const generateTokenSecret = () => {
    return crypto.randomBytes(64).toString("hex");
};

process.env.ACCESS_TOKEN_SECRET = generateTokenSecret();
process.env.REFRESH_TOKEN_SECRET = generateTokenSecret();

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.BD_CONNECTION_STRING, {
           // useNewUrlParser: true,  
           // useUnifiedTopology: true,
            //useCreateIndex: true,
        });
        console.log("Connected to MongoDB ....");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
}

connectToDatabase();

app.use("/api/signup", require("./src/routes/signup"));
app.use("/api/login", require("./src/routes/login"));
app.use("/api/user", authenticate, require("./src/routes/user"));
app.use("/api/signout", require("./src/routes/signout"));
app.use("/api/todos", authenticate, require("./src/routes/todos"));
app.use("/api/refresh-token", require("./src/routes/refreshToken"));
app.use("/api/indexRoutes", require("./src/routes/index.routes"));
app.use("/api/authRoutes", require("./src/routes/auth.routes"));
app.use('/api/post', require('./src/routes/posts'));
app.use('/api/reserva', require('./src/routes/reservas'));


const checkAdmin = checkRole('administrador');
const checkCliente = checkRole('cliente');


const protectedRoutes = express.Router();

protectedRoutes.get('/admin-route', authenticate, checkAdmin, (req, res) => {
    res.json({ message: 'Acceso permitido para administradores.' });
});

protectedRoutes.get('/client-route', authenticate, checkCliente, (req, res) => {
    res.json({ message: 'Acceso permitido para clientes.' });
});

app.use('/api/protected', protectedRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
