const db = require("../models");
const { sendError500 } = require("../utils/request.utils");

const ArtistaxGenero = db.artistaxgenero;

exports.listArtistaxGenero = async (_req, res) => {
    try {
        const artistaxgeneros = await ArtistaxGenero.findAll();
        res.send(artistaxgeneros);
    } catch (error) {
        sendError500(res);
    }
}

exports.getArtistaxGenero = async (req, res) => {
    const id = req.params.id;
    try {
        const artistaxgenero = await ArtistaxGenero.findByPk(id);
        if (!artistaxgenero) {
            res.status(404).send({ message: "Relación Artista x Género no encontrada" });
            return;
        }
        res.send(artistaxgenero);
    } catch (error) {
        sendError500(res);
    }
}

exports.createArtistaxGenero = async (req, res) => {
    try {
        const artistaxgenero = await ArtistaxGenero.create(req.body);
        res.status(201).send(artistaxgenero);
    } catch (error) {
        sendError500(res);
    }
}

exports.updateArtistaxGenero = async (req, res) => {
    const id = req.params.id;
    try {
        const artistaxgenero = await ArtistaxGenero.findByPk(id);
        if (!artistaxgenero) {
            res.status(404).send({ message: "Relación Artista x Género no encontrada" });
            return;
        }
        await artistaxgenero.update(req.body);
        res.send(artistaxgenero);
    } catch (error) {
        sendError500(res);
    }
}

exports.deleteArtistaxGenero = async (req, res) => {
    const id = req.params.id;
    try {
        const artistaxgenero = await ArtistaxGenero.findByPk(id);
        if (!artistaxgenero) {
            res.status(404).send({ message: "Relación Artista x Género no encontrada" });
            return;
        }
        await artistaxgenero.destroy();
        res.send({ message: "Relación Artista x Género eliminada correctamente" });
    } catch (error) {
        sendError500(res);
    }
}
