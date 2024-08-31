const { checkUserMiddleware } = require("../middlewares/check-user.middleware.js");

module.exports = app => {
    const controller = require("../controllers/usuarioparticipante.controller.js");
    let router = require("express").Router();

    // Ruta para agregar un participante a una rifa
    router.post("/", checkUserMiddleware, controller.addParticipant);

    // Ruta para obtener todos los participantes de una rifa
    router.get("/:idRifa", controller.getAllParticipants);

    

    app.use('/api/participantes', router);
}
