module.exports = (sequelize, Sequelize) => {
    const Curso = sequelize.define("curso", {
        titulo: {
            type: Sequelize.STRING,
        },
        descripcion: {
            type: Sequelize.TEXT,
        },
        duracion: {
            type: Sequelize.INTEGER, // en horas
        },
        imagen: {
            type: Sequelize.STRING, // URL de la imagen del curso
        }
    });
    return Curso;
};
