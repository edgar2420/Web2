const { checkUserMiddleware } = require("../middlewares/check-user.middleware.js");

module.exports = app => {
    const controller = require("../controllers/auth.controller.js");
    let router = require("express").Router();
    
    // Ruta para generar un token de usuario (iniciar sesión)
    router.post("/login", controller.generateUserToken);

    // Ruta para registrar un nuevo usuario
    router.post("/register", controller.registerUser);

    // Ruta para obtener la información del usuario actual
    router.get("/me", checkUserMiddleware, controller.me);

    app.use('/api/auth', router);
}
