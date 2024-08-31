const albumController = require("../controllers/album.controller");

module.exports = app => {
    let router = require("express").Router();
    router.get('/', albumController.listAlbums);
    router.get('/:id', albumController.getAlbum);
    router.post('/', albumController.createAlbum);
    router.put('/:id', albumController.updateAlbum);
    router.delete('/:id', albumController.deleteAlbum);

    app.use('/api/album', router);
};
