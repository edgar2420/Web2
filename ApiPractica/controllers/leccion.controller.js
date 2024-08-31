const db = require("../models");

// Controlador para crear una nueva lección
exports.createLeccion = async (req, res) => {
    const { cursoId, titulo, contenido, duracion, tipo, urlVideo } = req.body;

    if (!cursoId || !titulo || !contenido || !duracion || !tipo) {
        res.status(400).send({
            message: "Se requieren los campos 'cursoId', 'titulo', 'contenido', 'duracion' y 'tipo'."
        });
        return;
    }

    if (tipo === 'video' && !urlVideo) {
        res.status(400).send({
            message: "Se requiere el campo 'urlVideo' para lecciones de tipo video."
        });
        return;
    }

    try {
        const nuevaLeccion = await db.Leccion.create({ cursoId, titulo, contenido, duracion, tipo, urlVideo });
        res.status(201).send(nuevaLeccion);
    } catch (error) {
        console.error("Error al crear la lección:", error);
        res.status(500).send({
            message: "Ocurrió un error al crear la lección."
        });
    }
};

// Controlador para obtener todas las lecciones
exports.getAllLecciones = async (req, res) => {
    try {
        const lecciones = await db.Leccion.findAll();
        res.send(lecciones);
    } catch (error) {
        console.error("Error al obtener las lecciones:", error);
        res.status(500).send({
            message: "Ocurrió un error al obtener las lecciones."
        });
    }
};

// Controlador para obtener una lección por ID
exports.getLeccionById = async (req, res) => {
    const id = req.params.id;
    try {
        const leccion = await db.Leccion.findByPk(id);
        if (!leccion) {
            res.status(404).send({ message: `No se encontró la lección con id=${id}.` });
            return;
        }
        res.send(leccion);
    } catch (error) {
        console.error("Error al obtener la lección:", error);
        res.status(500).send({
            message: "Ocurrió un error al obtener la lección."
        });
    }
};

// Controlador para actualizar una lección
exports.updateLeccion = async (req, res) => {
    const id = req.params.id;
    const { titulo, contenido, duracion, tipo, urlVideo } = req.body;

    try {
        const leccion = await db.Leccion.findByPk(id);
        if (!leccion) {
            res.status(404).send({ message: `No se encontró la lección con id=${id}.` });
            return;
        }

        await leccion.update({ titulo, contenido, duracion, tipo, urlVideo });
        res.send(leccion);
    } catch (error) {
        console.error("Error al actualizar la lección:", error);
        res.status(500).send({
            message: "Ocurrió un error al actualizar la lección."
        });
    }
};

// Controlador para eliminar una lección
exports.deleteLeccion = async (req, res) => {
    const id = req.params.id;

    try {
        const leccion = await db.Leccion.findByPk(id);
        if (!leccion) {
            res.status(404).send({ message: `No se encontró la lección con id=${id}.` });
            return;
        }

        await leccion.destroy();
        res.send({ message: "Lección eliminada exitosamente." });
    } catch (error) {
        console.error("Error al eliminar la lección:", error);
        res.status(500).send({
            message: "Ocurrió un error al eliminar la lección."
        });
    }
};

// Controlador para obtener el detalle de una lección
exports.getLeccionDetalle = async (req, res) => {
    const leccionId = req.params.id;
    const usuarioId = req.userId; // Asumiendo que el ID del usuario está disponible en req.userId tras autenticación

    try {
        const leccion = await db.Leccion.findByPk(leccionId);

        if (!leccion) {
            res.status(404).send({ message: `No se encontró la lección con id=${leccionId}.` });
            return;
        }

        const inscripcion = await db.Inscripcion.findOne({ where: { usuarioId, cursoId: leccion.cursoId } });

        if (!inscripcion) {
            res.status(403).send({ message: "No está inscrito en el curso de esta lección." });
            return;
        }

        res.send(leccion);
    } catch (error) {
        console.error("Error al obtener el detalle de la lección:", error);
        res.status(500).send({
            message: "Ocurrió un error al obtener el detalle de la lección."
        });
    }
};

// Controlador para marcar una lección como completada
exports.completarLeccion = async (req, res) => {
    const leccionId = req.params.id;
    const usuarioId = req.userId; // Asumiendo que el ID del usuario está disponible en req.userId tras autenticación

    try {
        const leccion = await db.Leccion.findByPk(leccionId);

        if (!leccion) {
            res.status(404).send({ message: `No se encontró la lección con id=${leccionId}.` });
            return;
        }

        const inscripcion = await db.Inscripcion.findOne({ where: { usuarioId, cursoId: leccion.cursoId } });

        if (!inscripcion) {
            res.status(403).send({ message: "No está inscrito en el curso de esta lección." });
            return;
        }

        await db.UsuarioLeccion.create({ usuarioId, leccionId, completada: true });
        res.send({ message: "Lección marcada como completada." });
    } catch (error) {
        console.error("Error al marcar la lección como completada:", error);
        res.status(500).send({
            message: "Ocurrió un error al marcar la lección como completada."
        });
    }
};
