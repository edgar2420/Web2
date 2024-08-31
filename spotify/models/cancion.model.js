module.exports = (sequelize, Sequelize) => {
    const Cancion = sequelize.define("cancion", {
        nombre: {
            type: Sequelize.STRING
        },
        mp3: {
            type: Sequelize.VIRTUAL,
            get : function() {
                return `http://localhost:3000/mp3/${this.id}.mp3`
            }
        },
        imagen: {
            type: Sequelize.VIRTUAL,
            get : function() {
                return `http://localhost:3000/imagenes/cancion/${this.id}.png`
            }
        },
        albumId: {
            type: Sequelize.INTEGER
        },
        artistaId: {
            type: Sequelize.INTEGER 
        }
    });

    return Cancion;
};
