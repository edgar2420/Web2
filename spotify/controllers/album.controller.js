const db = require("../models");
const { checkRequiredFields, sendError500 } = require("../utils/request.utils");

exports.createAlbum = async (req, res) => {
    const requiredFields = ["nombre", "artistaId"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
        return;
    }
    try {
        const album = await db.album.create(req.body);
        res.send(album);
    } catch (error) {
        sendError500(res);
    }
}

exports.listAlbums = async (_req, res) => {
    try {
        const albums = await db.album.findAll({
            include: db.artista 
        });
        res.send(albums);
    } catch (error) {
        sendError500(res);
    }
}

exports.getAlbum = async (req, res) => {
    const id = req.params.id;
    try {
        const album = await db.album.findByPk(id, {
            include: db.artista 
        });
        if (!album) {
            res.status(404).send({ message: "Álbum no encontrado" });
            return;
        }
        res.send(album);
    } catch (error) {
        sendError500(res);
    }
}

exports.updateAlbum = async (req, res) => {
    const id = req.params.id;
    try {
        const album = await db.album.findByPk(id);
        if (!album) {
            res.status(404).send({ message: "Álbum no encontrado" });
            return;
        }
            await album.update(req.body);
        res.send(album);
    } catch (error) {
        sendError500(res);
    }
}

exports.deleteAlbum = async (req, res) => {
    const id = req.params.id;
    try {
        const album = await db.album.findByPk(id);
        if (!album) {
            res.status(404).send({ message: "Álbum no encontrado" });
            return;
        }
        await album.destroy();
        res.send({ message: "Álbum eliminado correctamente" });
    } catch (error) {
        sendError500(res);
    }
}

exports.uploadProfilePicture = async (req, res) => {
    const persona = await db.personas.findByPk(req.params.id);
    const imagen = req.files?.foto;
    if(!imagen){
        res.status(400).send({ message: "El campo foto es requerido" });
        return;
    }
    const nombreArchivo = `${persona.id}.png`;
    // eslint-disable-next-line no-undef
    imagen.mv(__dirname + `/uploads/imagenes/albumes${nombreArchivo}`);
    res.send({ message: "Foto subida correctamente" });
}