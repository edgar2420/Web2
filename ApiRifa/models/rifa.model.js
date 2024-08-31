module.exports = (sequelize, Sequelize) => {
    const Rifa = sequelize.define("rifa", {
        nombre: {
            type: Sequelize.STRING
        },
        cantTickets: {
            type: Sequelize.INTEGER
        },
        usuarioCreador: {
            type: Sequelize.INTEGER
        },
        codigo: {
            type: Sequelize.STRING
        },
        estado: {
            type: Sequelize.ENUM('pendiente', 'sorteada')
        }
    });
    return Rifa;
};
