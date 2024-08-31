const db = require("../models");
const { generarTokenUsuario } = require("../utils/code.utils");
const { stringToSha1 } = require("../utils/crypto.utils");
const { checkRequiredFields } = require("../utils/request.utils");

// Controlador para generar el token de usuario
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

    try {
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
    } catch (error) {
        console.error("Error al generar el token de usuario:", error);
        res.status(500).send({
            message: "Ocurrió un error al generar el token de usuario."
        });
    }
};

// Controlador para registrar un nuevo usuario
exports.registerUser = async (req, res) => {
    const requiredFields = ["email", "password"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
        return;
    }

    const { email, password } = req.body;

    try {
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
            email,
            password: stringToSha1(password)
        });

        usuario.password = undefined; // Eliminar el campo de la contraseña en la respuesta

        res.send(usuario);
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        res.status(500).send({
            message: "Ocurrió un error al registrar el usuario."
        });
    }
};

// Controlador para obtener los datos del usuario actual
exports.me = async (req, res) => {
    try {
        const persona = await db.Usuario.findOne({
            where: {
                id: res.locals.user.id
            }
        });

        if (!persona) {
            res.status(404).send({ message: "Usuario no encontrado." });
            return;
        }

        res.send(persona);
    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        res.status(500).send({
            message: "Ocurrió un error al obtener los datos del usuario."
        });
    }
};
