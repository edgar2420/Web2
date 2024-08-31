const db = require("../models");

// Controlador para crear un nuevo curso
exports.createCurso = async (req, res) => {
    const { titulo, descripcion, duracion, imagen } = req.body;

    if (!titulo || !descripcion || !duracion || !imagen) {
        res.status(400).send({
            message: "Se requieren los campos 'titulo', 'descripcion', 'duracion' y 'imagen'."
        });
        return;
    }

    try {
        const nuevoCurso = await db.Curso.create({ titulo, descripcion, duracion, imagen });
        res.status(201).send(nuevoCurso);
    } catch (error) {
        console.error("Error al crear el curso:", error);
        res.status(500).send({
            message: "Ocurrió un error al crear el curso."
        });
    }
};

// Controlador para obtener todos los cursos
exports.getAllCursos = async (req, res) => {
    try {
        const cursos = await db.Curso.findAll();
        res.send(cursos);
    } catch (error) {
        console.error("Error al obtener los cursos:", error);
        res.status(500).send({
            message: "Ocurrió un error al obtener los cursos."
        });
    }
};

// Controlador para obtener un curso por ID
exports.getCursoById = async (req, res) => {
    const id = req.params.id;
    try {
        const curso = await db.Curso.findByPk(id);
        if (!curso) {
            res.status(404).send({ message: `No se encontró el curso con id=${id}.` });
            return;
        }
        res.send(curso);
    } catch (error) {
        console.error("Error al obtener el curso:", error);
        res.status(500).send({
            message: "Ocurrió un error al obtener el curso."
        });
    }
};

// Controlador para actualizar un curso
exports.updateCurso = async (req, res) => {
    const id = req.params.id;
    const { titulo, descripcion, duracion, imagen } = req.body;

    try {
        const curso = await db.Curso.findByPk(id);
        if (!curso) {
            res.status(404).send({ message: `No se encontró el curso con id=${id}.` });
            return;
        }

        await curso.update({ titulo, descripcion, duracion, imagen });
        res.send(curso);
    } catch (error) {
        console.error("Error al actualizar el curso:", error);
        res.status(500).send({
            message: "Ocurrió un error al actualizar el curso."
        });
    }
};

// Controlador para eliminar un curso
exports.deleteCurso = async (req, res) => {
    const id = req.params.id;

    try {
        const curso = await db.Curso.findByPk(id);
        if (!curso) {
            res.status(404).send({ message: `No se encontró el curso con id=${id}.` });
            return;
        }

        await curso.destroy();
        res.send({ message: "Curso eliminado exitosamente." });
    } catch (error) {
        console.error("Error al eliminar el curso:", error);
        res.status(500).send({
            message: "Ocurrió un error al eliminar el curso."
        });
    }
};

// Controlador para obtener el detalle de un curso para usuarios autenticados
exports.getCursoDetalle = async (req, res) => {
    const cursoId = req.params.id;
    const usuarioId = req.userId; // Asumiendo que el ID del usuario está disponible en req.userId tras autenticación

    try {
        const curso = await db.Curso.findByPk(cursoId, {
            include: [db.Leccion]
        });

        if (!curso) {
            res.status(404).send({ message: `No se encontró el curso con id=${cursoId}.` });
            return;
        }

        const inscripcion = await db.Inscripcion.findOne({ where: { usuarioId, cursoId } });

        res.send({
            curso,
            lecciones: inscripcion ? curso.Leccions : [],
            inscrito: !!inscripcion,
            avance: inscripcion ? await calcularAvanceCurso(cursoId, usuarioId) : 0
        });
    } catch (error) {
        console.error("Error al obtener el detalle del curso:", error);
        res.status(500).send({
            message: "Ocurrió un error al obtener el detalle del curso."
        });
    }
};

const calcularAvanceCurso = async (cursoId, usuarioId) => {
    const totalLecciones = await db.Leccion.count({ where: { cursoId } });
    const leccionesCompletadas = await db.UsuarioLeccion.count({ where: { cursoId, usuarioId, completada: true } });

    return totalLecciones > 0 ? (leccionesCompletadas / totalLecciones) * 100 : 0;
};

// Controlador para matricular a un usuario en un curso
exports.matricularCurso = async (req, res) => {
    const usuarioId = req.userId; // Asumiendo que el ID del usuario está disponible en req.userId tras autenticación
    const cursoId = req.params.id;

    try {
        const inscripcionExistente = await db.Inscripcion.findOne({ where: { usuarioId, cursoId } });

        if (inscripcionExistente) {
            res.status(400).send({ message: "El usuario ya está inscrito en este curso." });
            return;
        }

        const nuevaInscripcion = await db.Inscripcion.create({ usuarioId, cursoId });
        res.status(201).send(nuevaInscripcion);
    } catch (error) {
        console.error("Error al matricularse en el curso:", error);
        res.status(500).send({
            message: "Ocurrió un error al matricularse en el curso."
        });
    }
};

// Controlador para obtener los cursos en los que un usuario está inscrito
exports.getMisCursos = async (req, res) => {
    const usuarioId = req.userId; // Asumiendo que el ID del usuario está disponible en req.userId tras autenticación

    try {
        const inscripciones = await db.Inscripcion.findAll({
            where: { usuarioId },
            include: [db.Curso]
        });

        res.send(await Promise.all(inscripciones.map(async inscripcion => ({
            curso: inscripcion.Curso,
            avance: await calcularAvanceCurso(inscripcion.cursoId, usuarioId)
        }))));
    } catch (error) {
        console.error("Error al obtener los cursos del usuario:", error);
        res.status(500).send({
            message: "Ocurrió un error al obtener los cursos del usuario."
        });
    }
};
