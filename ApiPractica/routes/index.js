module.exports = app => {
    require('./usuario.routes')(app);
    require('./curso.routes')(app);
    require('./leccion.routes')(app);
    require('./inscripcion.routes')(app);
};
