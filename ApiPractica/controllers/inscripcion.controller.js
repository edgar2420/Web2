const db = require("../models");

// Controlador para inscribir un usuario en un curso
exports.createInscripcion = async (req, res) => {
    const { usuarioId, cursoId } = req.body;

    if (!usuarioId || !cursoId) {
        res.status(400).send({
            message: "Se requieren los campos 'usuarioId' y 'cursoId'."
        });
        return;
    }

    try {
        const nuevaInscripcion = await db.Inscripcion.create({ usuarioId, cursoId });
        res.status(201).send(nuevaInscripcion);
    } catch (error) {
        console.error("Error al crear la inscripción:", error);
        res.status(500).send({
            message: "Ocurrió un error al crear la inscripción."
        });
    }
};

// Controlador para obtener todas las inscripciones
exports.getAllInscripciones = async (req, res) => {
    try {
        const inscripciones = await db.Inscripcion.findAll();
        res.send(inscripciones);
    } catch (error) {
        console.error("Error al obtener las inscripciones:", error);
        res.status(500).send({
            message: "Ocurrió un error al obtener las inscripciones."
        });
    }
};

// Controlador para obtener una inscripción por ID
exports.getInscripcionById = async (req, res) => {
    const id = req.params.id;
    try {
        const inscripcion = await db.Inscripcion.findByPk(id);
        if (!inscripcion) {
            res.status(404).send({ message: `No se encontró la inscripción con id=${id}.` });
            return;
        }
        res.send(inscripcion);
    } catch (error) {
        console.error("Error al obtener la inscripción:", error);
        res.status(500).send({
            message: "Ocurrió un error al obtener la inscripción."
        });
    }
};

// Controlador para eliminar una inscripción
exports.deleteInscripcion = async (req, res) => {
    const id = req.params.id;

    try {
        const inscripcion = await db.Inscripcion.findByPk(id);
        if (!inscripcion) {
            res.status(404).send({ message: `No se encontró la inscripción con id=${id}.` });
            return;
        }

        await inscripcion.destroy();
        res.send({ message: "Inscripción eliminada exitosamente." });
    } catch (error) {
        console.error("Error al eliminar la inscripción:", error);
        res.status(500).send({
            message: "Ocurrió un error al eliminar la inscripción."
        });
    }
};
