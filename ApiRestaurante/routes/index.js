module.exports = app => {
    require("./hamburguesa.routes")(app);
    require("./restaurante.routes")(app);
    require("./review.routes")(app);
    require("./usuario.routes")(app);
    require('./catalogo.routes')(app);
};
