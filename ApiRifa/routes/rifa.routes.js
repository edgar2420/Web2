const { checkUserMiddleware } = require("../middlewares/check-user.middleware.js");

module.exports = app => {
    const controller = require("../controllers/rifa.controller.js");
    let router = require("express").Router();
    
    
    // Ruta para crear una nueva rifa
    router.post("/", checkUserMiddleware, controller.createRifa);

    // Ruta para obtener todas las rifas
    router.get("/", controller.getAllRifas);

    // Ruta para iniciar el sorteo de una rifa
    router.post("/:id/iniciar-sorteo", checkUserMiddleware, controller.iniciarSorteo);

    // Ruta para obtener todas las rifas de un usuario
    router.get("/usuario/:id", controller.getRifaByUserId);

    // Ruta para participar en una rifa
    router.post("/participarRifa", checkUserMiddleware, controller.participarRifa);

    router.delete("/:id/delete", checkUserMiddleware, controller.delete);

    router.put("/:id/edit", checkUserMiddleware, controller.edit);

    router.get("/:id/ganadores", controller.ganadoresByRifa);

    app.use('/api/rifa', router);
}

