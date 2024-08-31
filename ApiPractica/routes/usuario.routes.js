const { checkUserMiddleware } = require("../middlewares/check-user.middleware.js");
const controller = require("../controllers/usuario.controller.js");
const express = require("express");
const router = express.Router();

// Ruta para generar un token de usuario (iniciar sesión)
router.post("/login", controller.generateUserToken);

// Ruta para registrar un nuevo usuario
router.post("/register", controller.registerUser);

// Ruta para obtener la información del usuario actual
router.get("/me", checkUserMiddleware, controller.me);

// Ruta para obtener todos los usuarios
router.get("/", checkUserMiddleware, controller.getAllUsers);

// Ruta para obtener un usuario por su ID
router.get("/:id", checkUserMiddleware, controller.getUserById);

module.exports = app => {
    app.use('/api/usuarios', router);
};
