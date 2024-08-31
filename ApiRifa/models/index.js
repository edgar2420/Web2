/*const dbConfig = require("../config/db.config");
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


// Modelos
db.usuarios = require("./usuario.model")(sequelize, Sequelize);
db.rifas = require('./rifa.model.js')(sequelize, Sequelize);
db.usuarioParticipantes = require('./usuarioparticipante.model.js')(sequelize, Sequelize);
db.usuarioauths = require('./auth.model.js')(sequelize, Sequelize); // Cambiado el nombre del modelo a usuarioauths

// Relaciones entre Usuario y UsuarioParticipante
db.usuarios.hasMany(db.usuarioParticipantes, { as: "participaciones", foreignKey: "idUsuario", onDelete: "CASCADE" });
db.usuarioParticipantes.belongsTo(db.usuarios, { foreignKey: "idUsuario", as: "usuario" });

// Relaciones entre Rifa y UsuarioParticipante
db.rifas.hasMany(db.usuarioParticipantes, { as: "participantes", foreignKey: "idRifa", onDelete: "CASCADE" });
db.usuarioParticipantes.belongsTo(db.rifas, { foreignKey: "idRifa", as: "rifa" });

// Relaciones entre Usuario y Rifa (creador de la rifa)
db.rifas.belongsTo(db.usuarios, { foreignKey: "usuarioCreador", as: "creador" });
db.usuarios.hasMany(db.rifas, { foreignKey: "usuarioCreador", as: "rifasCreadas" });

// Relación entre Usuario y UsuarioAuth (tokens de autenticación)
db.usuarios.hasMany(db.usuarioauths, { as: "tokens", foreignKey: "usuario_id", onDelete: "CASCADE" });
db.usuarioauths.belongsTo(db.usuarios, { foreignKey: "usuario_id", as: "usuario" });

module.exports = db;
*/


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

// Modelos
db.usuarios = require("./usuario.model")(sequelize, Sequelize);
db.rifas = require('./rifa.model.js')(sequelize, Sequelize);
db.usuarioParticipantes = require('./usuarioparticipante.model.js')(sequelize, Sequelize);
db.usuarioauths = require('./auth.model.js')(sequelize, Sequelize);

// Relaciones entre Usuario y UsuarioParticipante
db.usuarios.hasMany(db.usuarioParticipantes, { as: "participaciones", foreignKey: "idUsuario", onDelete: "CASCADE" });
db.usuarioParticipantes.belongsTo(db.usuarios, { foreignKey: "idUsuario", as: "usuario" });

// Relaciones entre Rifa y UsuarioParticipante
db.rifas.hasMany(db.usuarioParticipantes, { as: "participantes", foreignKey: "idRifa", onDelete: "CASCADE" });
db.usuarioParticipantes.belongsTo(db.rifas, { foreignKey: "idRifa", as: "rifa" });

// Relaciones entre Usuario y Rifa (creador de la rifa)
db.rifas.belongsTo(db.usuarios, { foreignKey: "usuarioCreador", as: "creador" });
db.usuarios.hasMany(db.rifas, { foreignKey: "usuarioCreador", as: "rifasCreadas" });

// Relación entre Usuario y UsuarioAuth (tokens de autenticación)
db.usuarios.hasMany(db.usuarios, { as: "tokens", foreignKey: "usuario_id", onDelete: "CASCADE" });
db.usuarioauths.belongsTo(db.usuarios, { foreignKey: "usuario_id", as: "usuario" });

module.exports = db;
