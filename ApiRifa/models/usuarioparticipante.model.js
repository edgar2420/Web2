module.exports = (sequelize, Sequelize) => {
    const UsuarioParticipante = sequelize.define("usuarioParticipante", {
        idUsuario: {
            type: Sequelize.INTEGER,
            references: {
                model: 'usuarios', // Nombre de la tabla
                key: 'id'
            }
        },
        idRifa: {
            type: Sequelize.INTEGER,
            references: {
                model: 'rifas', // Nombre de la tabla
                key: 'id'
            }
        },
        numeroTicket: {
            type: Sequelize.STRING
        },
        ganador: {
            type: Sequelize.BOOLEAN
        }
    });
    return UsuarioParticipante;
};
