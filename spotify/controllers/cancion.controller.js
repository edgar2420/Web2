const db = require("../models");
const { checkRequiredFields, sendError500 } = require("../utils/request.utils");


exports.listCanciones = async (_req, res) => {
    try {
        const canciones = await db.cancion.findAll({
            attributes: ['nombre', 'albumId'],
            include: [{ model: db.album, as: 'album', attributes: ['id', 'nombre'] }] 
        });
        res.send(canciones);
    } catch (error) {
        sendError500(res);
    }
}

exports.getCancion = async (req, res) => {
    const id = req.params.id;
    try {
        const cancion = await db.cancion.findByPk(id, {
            include: [{ model: db.album, as: 'album' }]
        });
        if (!cancion) {
            res.status(404).send({ message: "Canción no encontrada" });
            return;
        }
        res.send(cancion);
    } catch (error) {
        sendError500(res, error);
    }
}

exports.createCancion = async (req, res) => {
    const requiredFields = ["nombre", "albumId"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
        return;
    }

    const { nombre, albumId } = req.body;

    try {
        const albumExists = await db.album.findByPk(albumId);
        if (!albumExists) {
            res.status(404).send({ message: "El álbum especificado no existe" });
            return;
        }

        const cancion = await db.cancion.create({
            nombre: nombre,
            albumId: albumId,
        });
        res.send(cancion);
    } catch (error) {
        console.error("Error al crear la canción:", error);
        res.status(500).send({ message: "Ocurrió un error al crear la canción" });
    }
}

exports.updateCancion = async (req, res) => {
    const id = req.params.id;
    try {
        const cancion = await db.cancion.findByPk(id);
        if (!cancion) {
            res.status(404).send({ message: "Canción no encontrada" });
            return;
        }
        await cancion.update(req.body);
        res.send(cancion);
    } catch (error) {
        sendError500(res);
    }
}

exports.deleteCancion = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedRowCount = await db.cancion.destroy({
            where: { id: id }
        });
        if (deletedRowCount === 0) {
            res.status(404).send({ message: "Canción no encontrada" });
            return;
        }
        res.send({ message: "Canción eliminada" });
    } catch (error) {
        console.error("Error al eliminar la canción:", error);
        res.status(500).send({ message: "Ocurrió un error al eliminar la canción" });
    }
}

exports.uploadImage = async (req, res) => {
    const id = req.params.id;
    try {
        const cancion = await db.cancion.findByPk(id);
        if (!cancion) {
            res.status(404).send({ message: "Canción no encontrada" });
            return;
        }
        if (!req.files) {
            res.status(400).send({ message: "No se ha proporcionado ningún archivo" });
            return;
        }
        const image = req.files.image;
        if (!image.mimetype.startsWith('image')) {
            res.status(400).send({ message: "El archivo proporcionado no es una imagen" });
            return;
        }
        await image.mv(`/uploads2/imagenes/canciones${id}.jpg`);
        res.send({ message: "Imagen subida correctamente" });
    } catch (error) {
        console.error("Error al cargar la imagen:", error);
        res.status(500).send({ message: "Ocurrió un error al cargar la imagen" });
    }
}

exports.uploadSong = async (req, res) => {
    const id = req.params.id;
    try {
        const cancion = await db.cancion.findByPk(id);
        if (!cancion) {
            res.status(404).send({ message: "Canción no encontrada" });
            return;
        }
        if (!req.files) {
            res.status(400).send({ message: "No se ha proporcionado ningún archivo" });
            return;
        }
        const song = req.files.song;
        if (!song.mimetype.startsWith('audio')) {
            res.status(400).send({ message: "El archivo proporcionado no es un audio" });
            return;
        }
        await song.mv(`/uploads2.1/audio/canciones${id}.mp3`);
        res.send({ message: "Canción subida correctamente" });
    } catch (error) {
        console.error("Error al cargar la canción:", error);
        res.status(500).send({ message: "Ocurrió un error al cargar la canción" });
    }
}
