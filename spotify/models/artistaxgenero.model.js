module.exports = (sequelize, Sequelize) => {
    const ArtistaxGenero = sequelize.define("artistaxgenero", {
        generoId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        artistumId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });
    return ArtistaxGenero;
};
