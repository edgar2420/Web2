module.exports = app => {
    let router = require("express").Router();
    const restauranteController = require("../controllers/restaurante.controller.js");

    // Mostrar el formulario para crear un restaurante
    router.get('/crear', restauranteController.mostrarFormularioCrearRestaurante);

    // Crear un nuevo restaurante
    router.post('/crear', restauranteController.crearRestaurante);

    // Listar todos los restaurantes en la parte de administración
    router.get('/admin', restauranteController.obtenerRestaurantes);

    // Obtener los detalles de un restaurante (administración)
    router.get('/detalles/:id', restauranteController.obtenerRestaurante);

    // Mostrar formulario de editar un restaurante (administración)
    router.get('/editar/:id', restauranteController.mostrarFormularioEditarRestaurante);

    // Editar un restaurante (administración)
    router.post('/editar/:id', restauranteController.editarRestaurante);

    // Eliminar un restaurante
    router.post('/eliminar/:id', restauranteController.eliminarRestaurante);

    // Montar las rutas con el prefijo /restaurantes
    app.use('/restaurantes', router);
};
