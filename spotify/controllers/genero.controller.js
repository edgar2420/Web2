const db = require("../models");
const { checkRequiredFields, sendError500 } = require("../utils/request.utils");


const Genero = db.genero;

exports.listGeneros = async (_req, res) => {
    try {
        const generos = await Genero.findAll();
        res.send(generos);
    } catch (error) {
        sendError500(res);
    }
}

exports.getGenero = async (req, res) => {
    const id = req.params.id;
    try {
        const genero = await Genero.findByPk(id);
        if (!genero) {
            res.status(404).send({ message: "Género no encontrado" });
            return;
        }
        res.send(genero);
    } catch (error) {
        sendError500(res);
    }
}

exports.createGenero = async (req, res) => {
    const requiredFields = ["nombre"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);
    if (fieldsWithErrors.length > 0) {
        res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
        return;
    }
    try {
        const genero = await Genero.create(req.body);
        res.send(genero);
    } catch (error) {
        sendError500(res);
    }
}

exports.updateGenero = async (req, res) => {
    const id = req.params.id;
    try {
        const genero = await Genero.findByPk(id);
        if (!genero) {
            res.status(404).send({ message: "Género no encontrado" });
            return;
        }
        await genero.update(req.body);
        res.send(genero);
    } catch (error) {
        sendError500(res);
    }
}

exports.deleteGenero = async (req, res) => {
    const id = req.params.id;
    try {
        const genero = await Genero.findByPk(id);
        if (!genero) {
            res.status(404).send({ message: "Género no encontrado" });
            return;
        }
        await genero.destroy();
        res.send({ message: "Género eliminado correctamente" });
    } catch (error) {
        sendError500(res);
    }
}
