module.exports = (sequelize, Sequelize) => {
    const Inscripcion = sequelize.define("inscripcion", {
        usuarioId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'usuarios', // nombre de la tabla de usuarios
                key: 'id'
            }
        },
        cursoId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'cursos', // nombre de la tabla de cursos
                key: 'id'
            }
        },
        fechaInscripcion: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });
    return Inscripcion;
};
