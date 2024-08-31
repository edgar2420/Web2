
    const generos = require("../controllers/genero.controller.js");
    module.exports = app => {
    let router = require("express").Router();
    router.get('/', generos.listGeneros);
    router.get('/:id', generos.getGenero);
    router.post('/', generos.createGenero);
    router.put('/:id', generos.updateGenero);
    router.delete('/:id', generos.deleteGenero);


    app.use('/api/genero', router);
}
