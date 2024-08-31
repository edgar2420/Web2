const { checkUserMiddleware } = require("../middlewares/check-user.middleware.js");
const controller = require("../controllers/inscripcion.controller.js");
const express = require("express");
const router = express.Router();

// Ruta para crear una inscripción
router.post("/", checkUserMiddleware, controller.createInscripcion);

// Ruta para obtener todas las inscripciones
router.get("/", checkUserMiddleware, controller.getAllInscripciones);

// Ruta para obtener una inscripción por su ID
router.get("/:id", checkUserMiddleware, controller.getInscripcionById);

// Ruta para eliminar una inscripción
router.delete("/:id", checkUserMiddleware, controller.deleteInscripcion);

module.exports = app => {
    app.use('/api/inscripciones', router);
};
