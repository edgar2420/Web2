module.exports = (sequelize, Sequelize) => {
    const Hamburguesa = sequelize.define("hamburguesa", {
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        foto: {
            type: Sequelize.STRING
        },
        precio: {
            type: Sequelize.DECIMAL(10, 2)
        }
    });
    return Hamburguesa;
}
