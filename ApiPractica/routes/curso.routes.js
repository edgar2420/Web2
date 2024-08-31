const { checkUserMiddleware } = require("../middlewares/check-user.middleware.js");
const controller = require("../controllers/curso.controller.js");
const express = require("express");
const router = express.Router();

// Ruta para crear un nuevo curso
router.post("/", checkUserMiddleware, controller.createCurso);

// Ruta para obtener todos los cursos
router.get("/", checkUserMiddleware, controller.getAllCursos);

// Ruta para obtener un curso por su ID
router.get("/:id", checkUserMiddleware, controller.getCursoById);

// Ruta para actualizar un curso
router.put("/:id", checkUserMiddleware, controller.updateCurso);

// Ruta para eliminar un curso
router.delete("/:id", checkUserMiddleware, controller.deleteCurso);

// Ruta para obtener el detalle de un curso
router.get("/:id/detalle", checkUserMiddleware, controller.getCursoDetalle);

// Ruta para matricularse en un curso
router.post("/:id/matricular", checkUserMiddleware, controller.matricularCurso);

// Ruta para obtener los cursos del usuario
router.get("/mis-cursos", checkUserMiddleware, controller.getMisCursos);

module.exports = app => {
    app.use('/api/cursos', router);
};
