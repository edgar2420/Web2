module.exports = (sequelize, Sequelize) => {
    const Restautante = sequelize.define("restaurante", {
        nombre: {
            type: Sequelize.STRING
        },
        direccion: {
            type: Sequelize.STRING
        },
        foto: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        }
    });
    return Restautante;
}
