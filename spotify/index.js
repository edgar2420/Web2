const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const db = require("./models");
const routes = require("./routes");

const app = express();


// Variables del entorno
require('dotenv').config();

// Puerto
const port = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5173']
}));


// Body parser para leer los datos del formulario
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para carga de archivos
app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB límite de tamaño de archivo
}));

// Carpetas estáticas
app.use(express.static('public'));

// Middleware de manejo de errores
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
});

// Sincronización de la base de datos
db.sequelize.sync(/*{ force: true }*/).then(() => {
    console.log("DB resync");
});

// Configuración de las rutas
routes(app);

// Inicio del servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});