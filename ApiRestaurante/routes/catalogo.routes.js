module.exports = app => {
    let router = require("express").Router();
    const restauranteController = require("../controllers/restaurante.controller.js");

    // Mostrar todos los restaurantes en el catálogo público
    router.get('/restaurantes', restauranteController.mostrarCatalogoRestaurantes);

    // Ver un restaurante y sus hamburguesas en el catálogo
    router.get('/restaurantes/:id', restauranteController.verRestauranteEnCatalogo);

    // Montar las rutas con el prefijo /catalogo
    app.use('/catalogo', router);
};
