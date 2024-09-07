const db = require("../models");
const path = require('path');

// Mostrar el formulario de agregar restaurante
exports.mostrarFormularioCrearRestaurante = (req, res) => {
    res.render('admin/agregar-restaurante', { errores: null });
};

// Crear un nuevo restaurante
exports.crearRestaurante = async (req, res) => {
    const { nombre, direccion, descripcion } = req.body;

    // Validar que los campos no estén vacíos y que se haya subido una imagen
    if (!nombre || !direccion || !descripcion || !req.files || !req.files.foto) {
        return res.render('admin/agregar-restaurante', { errores: { mensaje: 'Todos los campos son obligatorios, incluida la imagen.' } });
    }

    const foto = req.files.foto;
    const uploadPath = path.join(__dirname, '..', 'public', 'uploads', foto.name);

    // Mover la imagen a la carpeta 'public/uploads'
    foto.mv(uploadPath, async (err) => {
        if (err) {
            console.error('Error al subir la imagen:', err);
            return res.status(500).send('Error al subir la imagen.');
        }

        try {
            // Crear restaurante con la ruta de la imagen
            const nuevoRestaurante = await db.Restaurante.create({
                nombre,
                direccion,
                descripcion,
                foto: `/uploads/${foto.name}` // Guardar la ruta relativa de la imagen
            });

            // Redirigir a la lista de restaurantes
            res.redirect('/restaurantes/admin');
        } catch (error) {
            console.error('Error al crear el restaurante:', error);
            res.status(500).render('admin/agregar-restaurante', { errores: { mensaje: 'Error al crear el restaurante.' } });
        }
    });
};

// Mostrar todos los restaurantes en el catálogo
exports.mostrarCatalogoRestaurantes = async (req, res) => {
    try {
        const restaurantes = await db.Restaurante.findAll({
            include: ['hamburguesas']  // Incluir las hamburguesas asociadas
        });

        // Renderizar la vista de catálogo de restaurantes
        res.render('catalogo/restaurantes', { restaurantes });
    } catch (error) {
        console.error('Error al obtener los restaurantes:', error);
        res.status(500).render('catalogo/restaurantes', { errores: { mensaje: 'Error al obtener los restaurantes' } });
    }
};

// Mostrar un restaurante y sus hamburguesas en el catálogo
exports.verRestauranteEnCatalogo = async (req, res) => {
    const { id } = req.params;

    try {
        const restaurante = await db.Restaurante.findByPk(id, {
            include: ['hamburguesas']  // Incluir las hamburguesas asociadas
        });

        if (!restaurante) {
            return res.status(404).render('catalogo/restaurantes', { errores: { mensaje: 'Restaurante no encontrado' } });
        }

        // Renderizar la vista de detalles del restaurante y sus hamburguesas
        res.render('catalogo/hamburguesas', { restaurante, hamburguesas: restaurante.hamburguesas });
    } catch (error) {
        console.error('Error al obtener el restaurante:', error);
        res.status(500).render('catalogo/restaurantes', { errores: { mensaje: 'Error al obtener el restaurante' } });
    }
};


// Obtener todos los restaurantes y mostrarlos en una vista
exports.obtenerRestaurantes = async (req, res) => {
    try {
        const restaurantes = await db.Restaurante.findAll({
            include: ['hamburguesas']  // Relación con las hamburguesas
        });

        // Renderizar la vista de lista de restaurantes
        res.render('admin/listar-restaurantes', { restaurantes });
    } catch (error) {
        console.error('Error al obtener los restaurantes:', error);
        res.status(500).render('admin/listar-restaurantes', { errores: { mensaje: 'Error al obtener los restaurantes' } });
    }
};

// Mostrar un restaurante específico por su ID
exports.obtenerRestaurante = async (req, res) => {
    const { id } = req.params;

    try {
        const restaurante = await db.Restaurante.findByPk(id, {
            include: ['hamburguesas']  // Relación con las hamburguesas
        });
        if (!restaurante) {
            return res.status(404).render('admin/listar-restaurantes', { errores: { mensaje: 'Restaurante no encontrado' } });
        }

        // Renderizar la vista con los detalles del restaurante
        res.render('admin/detalle-restaurante', { restaurante });
    } catch (error) {
        console.error('Error al obtener el restaurante:', error);
        res.status(500).render('admin/listar-restaurantes', { errores: { mensaje: 'Error al obtener el restaurante' } });
    }
};

// Mostrar formulario de edición con los datos del restaurante cargados
exports.mostrarFormularioEditarRestaurante = async (req, res) => {
    const { id } = req.params;

    try {
        const restaurante = await db.Restaurante.findByPk(id);
        if (!restaurante) {
            return res.status(404).render('admin/listar-restaurantes', { errores: { mensaje: 'Restaurante no encontrado' } });
        }

        // Renderizar la vista del formulario con los datos del restaurante
        res.render('admin/editar-restaurante', { restaurante, errores: null });
    } catch (error) {
        console.error('Error al cargar el restaurante:', error);
        res.status(500).render('admin/listar-restaurantes', { errores: { mensaje: 'Error al cargar el restaurante' } });
    }
};

// Editar un restaurante existente
exports.editarRestaurante = async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, descripcion } = req.body;

    try {
        const restaurante = await db.Restaurante.findByPk(id);
        if (!restaurante) {
            return res.status(404).render('admin/editar-restaurante', { errores: { mensaje: 'Restaurante no encontrado' }, restaurante });
        }

        // Actualizar campos
        restaurante.nombre = nombre;
        restaurante.direccion = direccion;
        restaurante.descripcion = descripcion;

        // Verificar si se subió una nueva imagen
        if (req.files && req.files.foto) {
            const foto = req.files.foto;
            const uploadPath = path.join(__dirname, '..', 'public', 'uploads', foto.name);

            // Mover la nueva imagen a la carpeta de uploads
            foto.mv(uploadPath, async (err) => {
                if (err) {
                    console.error('Error al subir la imagen:', err);
                    return res.status(500).send('Error al subir la imagen.');
                }
                // Actualizar la ruta de la nueva imagen
                restaurante.foto = `/uploads/${foto.name}`;
                await restaurante.save();
                res.redirect('/restaurantes/admin');
            });
        } else {
            // Si no se sube nueva imagen, mantener la imagen actual
            await restaurante.save();
            res.redirect('/restaurantes/admin');
        }
    } catch (error) {
        console.error('Error al editar el restaurante:', error);
        res.status(500).render('admin/editar-restaurante', { errores: { mensaje: 'Error al editar el restaurante.' }, restaurante });
    }
};

// Eliminar un restaurante
exports.eliminarRestaurante = async (req, res) => {
    const { id } = req.params;

    try {
        const restaurante = await db.Restaurante.findByPk(id);
        if (!restaurante) {
            return res.status(404).render('admin/listar-restaurantes', { errores: { mensaje: 'Restaurante no encontrado' } });
        }

        await restaurante.destroy();

        // Redirigir a la lista de restaurantes después de eliminar
        res.redirect('/restaurantes/admin');
    } catch (error) {
        console.error('Error al eliminar el restaurante:', error);
        res.status(500).render('admin/listar-restaurantes', { errores: { mensaje: 'Error al eliminar el restaurante' } });
    }
};
