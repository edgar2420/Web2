module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/usuario.controller.js");

    // Ruta para mostrar el formulario de registro
    router.get('/registro', controller.mostrarFormularioRegistro);

    // Ruta para procesar el registro
    router.post('/registro', controller.register);

    // Ruta para mostrar el formulario de inicio de sesión
    router.get('/iniciar-sesion', controller.mostrarFormularioLogin);

    // Ruta para procesar el inicio de sesión
    router.post('/iniciar-sesion', controller.login);

    // Montar las rutas con el prefijo /usuario
    app.use('/usuario', router);

};