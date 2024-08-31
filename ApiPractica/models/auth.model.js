module.exports = (sequelize, Sequelize) => {
    const UsuarioAuth = sequelize.define("usuarioauth", {
        usuario_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'usuarios', // Nombre de la tabla relacionada
                key: 'id'
            }
        },
        token: {
            type: Sequelize.STRING
        },
    })
    return UsuarioAuth;
};