const db = require("../models");

// Agregar un review a una hamburguesa
exports.agregarReview = async (req, res) => {
    try {
        const usuarioId = req.session.usuarioId; // ID del usuario autenticado
        const { comentario, puntuacion } = req.body;
        const hamburguesaId = req.params.hamburguesaId; // Obtener el ID de la hamburguesa desde los parámetros

        if (!usuarioId) {
            return res.status(401).send('Debes iniciar sesión para dejar una reseña.');
        }

        // Validar que todos los campos estén presentes
        if (!hamburguesaId || !comentario || !puntuacion) {
            return res.status(400).send('Todos los campos son obligatorios.');
        }

        // Crear la reseña
        const nuevaReview = await db.Review.create({
            usuarioId,
            hamburguesaId,
            comentario,
            puntuacion,
            fecha: new Date()
        });

        // Redirigir a la página de detalles de la hamburguesa
        res.redirect(`/hamburguesas/detalle/${hamburguesaId}`);
    } catch (error) {
        console.error('Error al agregar la reseña:', error);
        res.status(500).send('Error al agregar la reseña.');
    }
};

// Mostrar todos los reviews de una hamburguesa
exports.obtenerReviews = async (req, res) => {
    const { hamburguesaId } = req.params;

    try {
        const reviews = await db.Review.findAll({
            where: { hamburguesaId },
            include: ['usuario']
        });

        res.json(reviews);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los reviews.' });
    }
};

// Editar un review existente
exports.editarReview = async (req, res) => {
    const { id } = req.params;
    const { comentario, puntuacion } = req.body;

    try {
        const review = await db.Review.findByPk(id);

        if (!review) {
            return res.status(404).json({ mensaje: 'Review no encontrado' });
        }

        review.comentario = comentario;
        review.puntuacion = puntuacion;

        await review.save();
        res.redirect(`/hamburguesas/detalle/${review.hamburguesaId}`);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al editar el review.' });
    }
};

// Eliminar un review
exports.eliminarReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await db.Review.findByPk(id);

        if (!review) {
            return res.status(404).json({ mensaje: 'Review no encontrado' });
        }

        await review.destroy();
        res.redirect(`/hamburguesas/detalle/${review.hamburguesaId}`);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el review.' });
    }
};
