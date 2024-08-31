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

db.Usuario = require("./usuario.model.js")(sequelize, Sequelize);
db.UsuarioAuth = require("./auth.model.js")(sequelize, Sequelize);
db.Curso = require("./curso.model.js")(sequelize, Sequelize);
db.Inscripcion = require("./inscripcion.model.js")(sequelize, Sequelize);
db.Leccion = require("./leccion.model.js")(sequelize, Sequelize);

// Asociaciones
db.Usuario.belongsToMany(db.Curso, { through: db.Inscripcion, foreignKey: 'usuarioId' });
db.Curso.belongsToMany(db.Usuario, { through: db.Inscripcion, foreignKey: 'cursoId' });

db.Curso.hasMany(db.Leccion, { foreignKey: 'cursoId' });
db.Leccion.belongsTo(db.Curso, { foreignKey: 'cursoId' });

db.Usuario.hasMany(db.UsuarioAuth, { foreignKey: 'usuario_id' });
db.UsuarioAuth.belongsTo(db.Usuario, { foreignKey: 'usuario_id' });

module.exports = db;
