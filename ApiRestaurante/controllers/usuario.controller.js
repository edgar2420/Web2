const db = require("../models");
const bcrypt = require('bcrypt');

// Mostrar formulario de registro
exports.mostrarFormularioRegistro = (req, res) => {
    res.render('auth/registro', { errores: null });
};

// Registro de nuevo usuario con contraseña encriptada
exports.register = async (req, res) => {
    const { email, password } = req.body;

    // Validar campos vacíos
    if (!email || !password) {
        return res.render('auth/registro', { errores: { mensaje: 'El correo y la contraseña son obligatorios' } });
    }

    try {
        // Verificar si el usuario ya existe
        const usuarioExistente = await db.Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.render('auth/registro', { errores: { mensaje: 'El correo ya está registrado' } });
        }

        // Encriptar la contraseña usando bcrypt (genSalt genera automáticamente un salt)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario con la contraseña encriptada
        await db.Usuario.create({ email, password: hashedPassword });
        return res.redirect('/usuario/iniciar-sesion');  // Redirigir al login después de registrarse
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.render('auth/registro', { errores: { mensaje: 'Error del servidor. Intente nuevamente.' } });
    }
};

// Mostrar formulario de inicio de sesión
exports.mostrarFormularioLogin = (req, res) => {
    res.render('auth/iniciar-sesion', { errores: null });
};

// Inicio de sesión con verificación de contraseña usando bcrypt
// Proceso de inicio de sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render('auth/iniciar-sesion', { errores: { mensaje: 'El correo y la contraseña son obligatorios' } });
    }

    try {
        // Buscar al usuario en la base de datos
        const usuario = await db.Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.render('auth/iniciar-sesion', { errores: { mensaje: 'Usuario no encontrado' } });
        }

        // Verificar la contraseña
        const esPasswordValida = await bcrypt.compare(password, usuario.password);
        if (!esPasswordValida) {
            return res.render('auth/iniciar-sesion', { errores: { mensaje: 'Contraseña incorrecta' } });
        }

        // Guardar el usuario en la sesión
        req.session.usuarioId = usuario.id;
        req.session.usuario = usuario;

        // Autenticación exitosa, redirigir al catálogo de restaurantes
        return res.redirect('/catalogo/restaurantes');
    } catch (error) {
        console.error('Error en el proceso de autenticación:', error);
        return res.render('auth/iniciar-sesion', { errores: { mensaje: 'Error del servidor. Intenta nuevamente.' } });
    }
};
