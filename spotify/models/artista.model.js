module.exports = (sequelize, Sequelize) => {
    const Artista = sequelize.define("artista", {
        nombre: {
            type: Sequelize.STRING
        },
        imageUrl: { 
            type: Sequelize.VIRTUAL,
            get: function() { 
                return `http://localhost:3000/prueba/imagenes/artistas/${this.id}.png`
            }
        }
    });

    return Artista;
};
