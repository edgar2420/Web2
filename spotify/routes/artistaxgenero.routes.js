module.exports = app => {
    const artistaxgenero = require("../controllers/artistaxgenero.controller.js");
    let router = require("express").Router();
    router.get('/', artistaxgenero.listArtistaxGenero);
    router.get('/:id', artistaxgenero.getArtistaxGenero);
    router.post('/', artistaxgenero.createArtistaxGenero);
    router.put('/:id', artistaxgenero.updateArtistaxGenero);
    router.delete('/:id', artistaxgenero.deleteArtistaxGenero);

    app.use('/api/artistaxgenero', router);
}