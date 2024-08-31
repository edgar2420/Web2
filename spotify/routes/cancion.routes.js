const canciones = require("../controllers/cancion.controller");

module.exports = app => {
    let router = require("express").Router();
    router.get('/', canciones.listCanciones);
    router.get('/:id', canciones.getCancion);
    router.post('/', canciones.createCancion);
    router.put('/:id', canciones.updateCancion);
    router.delete('/:id', canciones.deleteCancion);

    app.use('/api/canciones', router);
};
