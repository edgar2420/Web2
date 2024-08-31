const db = require("../models");
const { checkRequiredFields } = require("../utils/request.utils");

// Controlador para agregar un participante a una rifa
exports.addParticipant = async (req, res) => {
    const requiredFields = ["idUsuario", "idRifa", "numeroTicket"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    
    if (fieldsWithErrors.length > 0) {
        res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
        return;
    }

    try {
        const { idUsuario, idRifa, numeroTicket } = req.body;

        // Verificar si el usuario ya es participante de la rifa
        const participanteExistente = await db.usuarioParticipantes.findOne({
            where: { idUsuario, idRifa }
        });
        if (participanteExistente) {
            res.status(400).send({
                message: "El usuario ya es participante de esta rifa."
            });
            return;
        }

        // Crear el nuevo participante
        const nuevoParticipante = await db.usuarioParticipantes.create({
            idUsuario,
            idRifa,
            numeroTicket,
            ganador: false
        });

        res.status(201).send(nuevoParticipante);
    } catch (error) {
        console.error("Error al agregar participante:", error);
        res.status(500).send({
            message: "Ocurrió un error al agregar participante."
        });
    }
};

// Controlador para obtener todos los participantes de una rifa
exports.getAllParticipants = async (req, res) => {
    try {
        const rifaId = req.params.idRifa;

        // Obtener todos los participantes de la rifa especificada
        const participantes = await db.usuarioParticipantes.findAll({
            where: { idRifa: rifaId }
        });

        res.send(participantes);
    } catch (error) {
        console.error("Error al obtener participantes:", error);
        res.status(500).send({
            message: "Ocurrió un error al obtener participantes."
        });
    }
};
