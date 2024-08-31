module.exports = (sequelize, Sequelize) => {
    const Genero = sequelize.define("genero", {
        nombre: {
            type: Sequelize.STRING
        },
        imageUrl: {
            type: Sequelize.VIRTUAL,
            get: function() {
                return `http://localhost:3000/imagenes/genero/${this.id}.png`
            }
        }
    });
    return Genero;
};
