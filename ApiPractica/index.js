const express = require('express');
const cors = require('cors');
const app = express();

// Variables del entorno
require('dotenv').config();

// Configurar CORS para permitir solicitudes desde Live Server
const corsOptions = {
    origin: '*', // Permitir cualquier origen (solo para pruebas)
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


// Body parser para leer los datos del formulario
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Base de datos
const db = require("./models");
db.sequelize.sync().then(() => {
    console.log("db resync");
});

// Rutas
require("./routes")(app);

// Puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
