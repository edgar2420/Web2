const db = require("../models");
const { checkRequiredFields, sendError500 } = require("../utils/request.utils");


exports.listArtistas = async (_req, res) => {
    try {
        const artistas = await db.artista.findAll();
        res.send(artistas);
    } catch (error) {
        sendError500(res);
    }
}

exports.getArtista = async (req, res) => {
    const id = req.params.id;
    try {
        const artista = await db.artista.findByPk(id);
        if (!artista) {
            res.status(404).send({ message: "Artista no encontrado" });
            return;
        }
        res.send(artista);
    } catch (error) {
        sendError500(res);
    }
}

exports.createArtista = async (req, res) => {
    const requiredFields = ["nombre"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
        return;
    }
    try {
        const artista = await db.artista.create(req.body);
        res.send(artista);
    } catch (error) {
        sendError500(res);
    }
}

exports.updateArtista = async (req, res) => {
    const id = req.params.id;
    try {
        const artista = await db.artista.findByPk(id);
        if (!artista) {
            res.status(404).send({ message: "Artista no encontrado" });
            return;
        }
        await artista.update(req.body);
        res.send(artista);
    } catch (error) {
        sendError500(res);
    }
}

exports.deleteArtista = async (req, res) => {
    const id = req.params.id;
    try {
        const artista = await db.artista.findByPk(id);
        if (!artista) {
            res.status(404).send({ message: "Artista no encontrado" });
            return;
        }
        await artista.destroy();
        res.send({ message: "Artista eliminado correctamente" });
    } catch (error) {
        sendError500(res);
    }
}



