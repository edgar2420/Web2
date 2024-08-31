module.exports = (sequelize, Sequelize) => {
    const Leccion = sequelize.define("leccion", {
        cursoId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'cursos', // nombre de la tabla de cursos
                key: 'id'
            }
        },
        titulo: {
            type: Sequelize.STRING,
        },
        contenido: {
            type: Sequelize.TEXT,
        },
        duracion: {
            type: Sequelize.INTEGER, // en minutos
        },
        tipo: {
            type: Sequelize.ENUM('texto', 'video'), // tipo de la lección: texto o video
        },
        urlVideo: {
            type: Sequelize.STRING, // URL del video para lecciones de tipo video
        }
    });
    return Leccion;
};
