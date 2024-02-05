const router = require("express").Router();
const { jsonResponse } = require("../controllers/jsonResponse");
const Parqueadero = require("../models/parqueadero");

router.post("/", async (req, res) => {
    const { nombre, longitud, altura } = req.body;

    if (!nombre || !longitud || !altura) {
        return res.status(400).json(jsonResponse(400, {
            error: "Nombre, longitud y altura son requeridos."
        }));
    }

    try {
        const exists = await Parqueadero.ParqueaderoExist(nombre);

        if (exists) {
            return res.status(400).json(jsonResponse(400, {
                error: "El Parqueadero ya existe."
            }));
        }

        const newParqueadero = new Parqueadero({ nombre, longitud, altura });

        await newParqueadero.save();

        sendConfirmationEmail(nombre);

        res.status(200).json(jsonResponse(200, {
            message: "Parqueadero creado."
        }));
    } catch (error) {
        console.error(error); 
        res.status(500).json(jsonResponse(500, {
            error: "Error al crear un Parqueadero."
        }));
    }
});

module.exports = router;
