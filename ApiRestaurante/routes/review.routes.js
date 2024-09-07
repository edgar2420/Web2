module.exports = app => {
    const router = require('express').Router();
    const reviewController = require('../controllers/review.controller.js');

    // Ruta para agregar una reseña a una hamburguesa
    router.post('/:hamburguesaId/review', reviewController.agregarReview);

    // Ruta para obtener todas las reseñas de una hamburguesa
    router.get('/hamburguesa/:hamburguesaId', reviewController.obtenerReviews);

    // Ruta para editar una reseña
    router.post('/editar/:id', reviewController.editarReview);

    // Ruta para eliminar una reseña
    router.post('/eliminar/:id', reviewController.eliminarReview);

    app.use('/reviews', router);
};
