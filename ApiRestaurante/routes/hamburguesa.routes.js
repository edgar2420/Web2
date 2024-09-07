module.exports = app => {
    let router = require("express").Router();
    const hamburguesaController = require("../controllers/hamburguesa.controller.js");

    // Mostrar formulario para crear hamburguesa
    router.get('/crear', hamburguesaController.mostrarFormularioCrearHamburguesa);

    // Crear una nueva hamburguesa
    router.post('/crear', hamburguesaController.crearHamburguesa);

    // Listar todas las hamburguesas
    router.get('/admin', hamburguesaController.obtenerHamburguesas);

    // Ruta para mostrar el detalle de una hamburguesa específica
    router.get('/detalle/:id', hamburguesaController.obtenerHamburguesa);

    // Mostrar formulario para editar hamburguesa
    router.get('/editar/:id', hamburguesaController.mostrarFormularioEditarHamburguesa);

    // Editar una hamburguesa existente
    router.post('/editar/:id', hamburguesaController.editarHamburguesa);

    // Eliminar una hamburguesa
    router.post('/eliminar/:id', hamburguesaController.eliminarHamburguesa);

    app.use('/hamburguesas', router);
};
