const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importa los modelos y configura las relaciones
db.artista = require("./artista.model")(sequelize, Sequelize);
db.genero = require("./genero.model")(sequelize, Sequelize);
db.artistaxgenero = require("./artistaxgenero.model")(sequelize, Sequelize);
db.cancion = require("./cancion.model")(sequelize, Sequelize);
db.album = require("./album.model")(sequelize, Sequelize);

// Configura las relaciones entre los modelos
db.artista.hasMany(db.album, { foreignKey: 'artistaId' });
db.album.belongsTo(db.artista, { foreignKey: 'artistaId' });

db.album.hasMany(db.cancion, { foreignKey: 'albumId' });
db.cancion.belongsTo(db.album, { foreignKey: 'albumId' });

db.genero.belongsToMany(db.artista, { through: db.artistaxgenero });
db.artista.belongsToMany(db.genero, { through: db.artistaxgenero });

// Añadimos una asociación entre la tabla Cancion y la tabla Artista
db.cancion.belongsTo(db.artista, { foreignKey: 'artistaId' });

// Definimos las asociaciones entre la tabla intermedia artistaxgenero y las tablas Artista y Genero
db.artistaxgenero.belongsTo(db.artista, { foreignKey: 'artistaId' });
db.artistaxgenero.belongsTo(db.genero, { foreignKey: 'generoId' });

module.exports = db;
