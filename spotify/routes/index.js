module.exports = app => {
    require('./artista.routes')(app);
    require('./genero.routes')(app);
    require('./cancion.routes')(app);
    require('./album.routes')(app);
    require('./artistaxgenero.routes')(app);
}