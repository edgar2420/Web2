module.exports = app => {
    const artistaController = require("../controllers/artista.controller");
    let router = require("express").Router();
    router.get('/', artistaController.listArtistas);
    router.post("/", artistaController.createArtista);
    router.put("/:id", artistaController.updateArtista);
    router.delete("/:id", artistaController.deleteArtista);

    app.use('/api/artista', router);
};
