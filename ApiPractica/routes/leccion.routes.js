const { checkUserMiddleware } = require("../middlewares/check-user.middleware.js");
const controller = require("../controllers/leccion.controller.js");
const express = require("express");
const router = express.Router();

// Ruta para crear una nueva lección
router.post("/", checkUserMiddleware, controller.createLeccion);

// Ruta para obtener todas las lecciones
router.get("/", checkUserMiddleware, controller.getAllLecciones);

// Ruta para obtener una lección por su ID
router.get("/:id", checkUserMiddleware, controller.getLeccionById);

// Ruta para actualizar una lección
router.put("/:id", checkUserMiddleware, controller.updateLeccion);

// Ruta para eliminar una lección
router.delete("/:id", checkUserMiddleware, controller.deleteLeccion);

// Ruta para obtener el detalle de una lección
router.get("/:id/detalle", checkUserMiddleware, controller.getLeccionDetalle);

// Ruta para marcar una lección como completada
router.post("/:id/completar", checkUserMiddleware, controller.completarLeccion);

module.exports = app => {
    app.use('/api/lecciones', router);
};
