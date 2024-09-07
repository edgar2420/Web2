const db = require("../models");
const path = require('path');

// Mostrar formulario para agregar hamburguesa
exports.mostrarFormularioCrearHamburguesa = async (req, res) => {
    try {
        const restaurantes = await db.Restaurante.findAll();
        res.render('admin/agregar-hamburguesa', { restaurantes, errores: null });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al cargar el formulario' });
    }
};

// Crear una nueva hamburguesa
exports.crearHamburguesa = async (req, res) => {
    const { nombre, descripcion, precio, restauranteId } = req.body;

    // Validar campos vacíos
    if (!nombre || !descripcion || !precio || !req.files || !req.files.foto || !restauranteId) {
        const restaurantes = await db.Restaurante.findAll();
        return res.render('admin/agregar-hamburguesa', { errores: { mensaje: 'Todos los campos son obligatorios.' }, restaurantes });
    }

    const foto = req.files.foto;
    const uploadPath = path.join(__dirname, '..', 'public', 'uploads', foto.name);

    foto.mv(uploadPath, async (err) => {
        if (err) {
            return res.status(500).send('Error al subir la imagen.');
        }

        try {
            // Crear hamburguesa con la ruta de la imagen
            const nuevaHamburguesa = await db.Hamburguesa.create({
                nombre,
                descripcion,
                foto: `/uploads/${foto.name}`,
                precio,
                restauranteId
            });

            res.redirect('/hamburguesas/admin');
        } catch (error) {
            res.status(500).send({ mensaje: 'Error al crear la hamburguesa.' });
        }
    });
};

// Listar todas las hamburguesas
exports.obtenerHamburguesas = async (req, res) => {
    try {
        const hamburguesas = await db.Hamburguesa.findAll({
            include: ['restaurante', 'reviews']
        });
        res.render('admin/listar-hamburguesas', { hamburguesas });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener las hamburguesas.' });
    }
};

// Obtener detalles de una hamburguesa por su ID
exports.obtenerHamburguesa = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar la hamburguesa por ID e incluir el restaurante y las reviews
        const hamburguesa = await db.Hamburguesa.findByPk(id, {
            include: [
                { model: db.Restaurante, as: 'restaurante' },  // Incluir el restaurante asociado
                { model: db.Review, as: 'reviews', include: ['usuario'] }  // Incluir las reviews con el usuario
            ]
        });

        if (!hamburguesa) {
            return res.status(404).send({ mensaje: 'Hamburguesa no encontrada' });
        }

        // Pasar la hamburguesa y sus reviews a la vista
        res.render('catalogo/detalle-hamburguesa', { hamburguesa, reviews: hamburguesa.reviews });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener la hamburguesa.' });
    }
};


// Mostrar formulario para editar hamburguesa
exports.mostrarFormularioEditarHamburguesa = async (req, res) => {
    const { id } = req.params;

    try {
        const hamburguesa = await db.Hamburguesa.findByPk(id);
        const restaurantes = await db.Restaurante.findAll();

        if (!hamburguesa) {
            return res.status(404).send({ mensaje: 'Hamburguesa no encontrada' });
        }

        res.render('admin/editar-hamburguesa', { hamburguesa, restaurantes, errores: null });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al cargar el formulario de edición.' });
    }
};

// Editar una hamburguesa existente
exports.editarHamburguesa = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, restauranteId } = req.body;

    try {
        const hamburguesa = await db.Hamburguesa.findByPk(id);
        if (!hamburguesa) {
            return res.status(404).send({ mensaje: 'Hamburguesa no encontrada' });
        }

        // Si se sube una nueva imagen, reemplazar la imagen existente
        if (req.files && req.files.foto) {
            const foto = req.files.foto;
            const uploadPath = path.join(__dirname, '..', 'public', 'uploads', foto.name);

            foto.mv(uploadPath, async (err) => {
                if (err) {
                    return res.status(500).send('Error al subir la nueva imagen.');
                }

                // Actualizar la hamburguesa con la nueva imagen y otros datos
                hamburguesa.foto = `/uploads/${foto.name}`;
                hamburguesa.nombre = nombre;
                hamburguesa.descripcion = descripcion;
                hamburguesa.precio = precio;
                hamburguesa.restauranteId = restauranteId;

                await hamburguesa.save();
                res.redirect('/hamburguesas/admin');
            });
        } else {
            // Si no se sube una nueva imagen, solo actualizar los demás campos
            hamburguesa.nombre = nombre;
            hamburguesa.descripcion = descripcion;
            hamburguesa.precio = precio;
            hamburguesa.restauranteId = restauranteId;

            await hamburguesa.save();
            res.redirect('/hamburguesas/admin');
        }
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al editar la hamburguesa.' });
    }
};

// Eliminar una hamburguesa
exports.eliminarHamburguesa = async (req, res) => {
    const { id } = req.params;

    try {
        const hamburguesa = await db.Hamburguesa.findByPk(id);
        if (!hamburguesa) {
            return res.status(404).send({ mensaje: 'Hamburguesa no encontrada' });
        }

        await hamburguesa.destroy();
        res.redirect('/hamburguesas/admin');
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar la hamburguesa.' });
    }
};
