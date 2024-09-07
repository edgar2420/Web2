module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("review", {
        comentario: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        puntuacion: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        fecha: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        // Relación con el usuario que dejó el review
        usuarioId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios', // Nombre de la tabla de usuarios
                key: 'id'
            }
        },
        // Relación con la hamburguesa que está siendo evaluada
        hamburguesaId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'hamburguesas', // Nombre de la tabla de hamburguesas
                key: 'id'
            }
        }
    });

    return Review;
};
