const db = require("../models");
const { generarTokenUsuario } = require("../utils/code.utils");
const { stringToSha1 } = require("../utils/crypto.utils");
const { checkRequiredFields } = require("../utils/request.utils");

exports.generateUserToken = async (req, res) => {
    const requiredFields = ["email", "password"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
        return;
    }

    const { email, password } = req.body;

    const usuario = await db.Usuario.findOne({
        where: {
            email,
            password: stringToSha1(password)
        }
    });
    if (!usuario) {
        res.status(401).send({ message: "Usuario o contraseña incorrectos" });
        return;
    }
    const token = generarTokenUsuario();
    await db.UsuarioAuth.create({
        token,
        usuario_id: usuario.id
    });
    res.send({ token });
};

exports.registerUser = async (req, res) => {
    const requiredFields = ["nombre", "apellido", "email", "password"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
        return;
    }

    const { nombre, apellido, email, password } = req.body;
    const usuarioDB = await db.Usuario.findOne({
        where: {
            email
        }
    });
    if (usuarioDB) {
        res.status(400).send({
            message: "El email ya está registrado"
        });
        return;
    }

    const usuario = await db.Usuario.create({
        nombre,
        apellido,
        email,
        password: stringToSha1(password)
    });
    usuario.password = undefined;

    res.send(usuario);
};

exports.me = async (req, res) => {
    console.log("Usuario actual", res.locals.user)
    const persona = await db.Usuario.findOne({
        where: {
            id: res.locals.user.id  // Cambia usuario_id a id
        }
    });
    if (!persona) {
        res.status(404).send({ message: "Usuario no encontrado" });
        return;
    }
    res.send(persona);
};

exports.getAllUsers = async (req, res) => {
    try {
        const usuarios = await db.Usuario.findAll();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener la lista de usuarios" });
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const usuario = await db.Usuario.findOne({ where: { id: userId } });
        if (!usuario) {
            res.status(404).send({ message: "Usuario no encontrado" });
            return;
        }
        res.send(usuario);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener el usuario" });
    }
};
