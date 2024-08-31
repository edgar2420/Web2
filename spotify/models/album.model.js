module.exports = (sequelize, Sequelize) => {
    const Album = sequelize.define("album", {
        nombre: {
            type: Sequelize.STRING
        },
        imageUrl: {
        type: Sequelize.VIRTUAL,
        get: function () {
            return `http://localhost:3000/imagenes/album/${this.id}.png`
        }
    },
    artistaId: {
        type: Sequelize.INTEGER,    
    }
    }, {
        tableName: 'albums'
})
    return Album;
};