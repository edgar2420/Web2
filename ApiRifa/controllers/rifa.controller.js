const { where } = require("sequelize");
const db = require("../models");
const { generarCodigo } = require("../utils/code.utils");
const { checkRequiredFields } = require("../utils/request.utils");

// Controlador para crear una nueva rifa
exports.createRifa = async (req, res) => {
    const { nombre, UsuarioList, usuarioCreador } = req.body;

    // Verificar si los campos requeridos están presentes en la solicitud
    if (!nombre || !UsuarioList || !usuarioCreador) {
        res.status(400).send({
            message: "Se requieren los campos 'nombre', 'Lista Usuario' y 'usuarioCreador'."
        });
        return;
    }

    try {
        // Generar el código de la rifa (formato SIS-XXXX)
        const codigoRifa = `SIS-${generarCodigo()}`;

        // Crear la rifa en la base de datos
        const nuevaRifa = await db.rifas.create({
            nombre,
            usuarioCreador,
            cantTickets: UsuarioList.length,
            codigo: codigoRifa,
            estado: "pendiente"
        });
        debugger;
                 // Crear los tickets individuales y asignarles el código de rifa
                console.log(UsuarioList);
                for (let i = 0; i < UsuarioList.length; i++) {
                    console.log(UsuarioList[i]);
                    await db.usuarioParticipantes.create({
                        idRifa: nuevaRifa.id,
                        idUsuario: UsuarioList[i],
                        numeroTicket: `${codigoRifa}-${i + 1}`,
                        ganador: false
                });
                }
        res.status(201).send(nuevaRifa);
    } catch (error) {
        console.error("Error al crear la rifa:", error);
        res.status(500).send({
            message: "Ocurrió un error al crear la rifa."
        });
    }
};
// Controlador para obtener todas las rifas
exports.getAllRifas = async (req, res) => {
    try {
        // Obtener todas las rifas de la base de datos
        const rifas = await db.rifas.findAll(
            { where: { estado: "pendiente" } }
        );
        res.send(rifas);
    } catch (error) {
        console.error("Error al obtener todas las rifas:", error);
        res.status(500).send({
            message: "Ocurrió un error al obtener todas las rifas."
        });
    }
};

exports.participarRifa = async (req, res) => {
    const requiredFields = ["idUsuario", "idRifa"];
    const fieldsWithErrors = checkRequiredFields(requiredFields, req.body);

    if (fieldsWithErrors.length > 0) {
        res.status(400).send({
            message: `Faltan los siguientes campos: ${fieldsWithErrors.join(", ")}`
        });
        return;
    }

    try {
        const { idUsuario, idRifa } = req.body;

        // Verificar si el usuario ya es participante de la rifa
        const participanteExistente = await db.usuarioParticipantes.findOne({
            where: { idUsuario, idRifa }
        });
        if (participanteExistente) {
            res.status(400).send({
                message: "El usuario ya es participante de esta rifa."
            });
            return;
        }
        //Obtener la rifa en base al id
        const rifa = await db.rifas.findByPk(idRifa);
        if (!rifa) {
            res.status(404).send({
                message: `No se encontró la rifa con id=${idRifa}.`
            });
            return;
        }
        if (rifa.estado !== "pendiente") {
            res.status(400).send({
                message: "Esta rifa ya ha sido sorteada."
            });
            return;
        }
        // Crear el nuevo participante
        const nuevoParticipante = await db.usuarioParticipantes.create({
            idUsuario,
            idRifa,
            numeroTicket: `${rifa.codigo}-${rifa.cantTickets + 1}`,
            ganador: false
        });
        //actualizar la cantidad de tickets de la rifa
        await rifa.update({ cantTickets: rifa.cantTickets + 1 });
        res.status(201).send(nuevoParticipante);
        } catch (error) {
        console.error("Error al agregar participante:", error);
        res.status(500).send({
            message: "Ocurrió un error al agregar participante."
        });
    }
};


exports.getRifaByUserId = async (req, res) => {
    const userId = req.params.id;
    try {
        const rifas = await db.rifas.findAll({
            where: { usuarioCreador: userId }
        });
        res.send(rifas);
    } catch (error) {
        console.error("Error al obtener todas las rifas:", error);
        res.status(500).send({
            message: "Ocurrió un error al obtener todas las rifas."
        });
    }
}


// Controlador para iniciar el sorteo de una rifa
exports.iniciarSorteo = async (req, res) => {
    try {
        const rifaId = req.params.id;
        const cantidadGanadores = req.body.cantidadGanadores;

        // Encontrar la rifa por su ID
        const rifa = await db.rifas.findByPk(rifaId);
        if (!rifa) {
            res.status(404).send({
                message: `No se encontró la rifa con id=${rifaId}.`
            });
            return;
        }

        // Verificar si la rifa ya ha sido sorteada
        if (rifa.estado !== "pendiente") {
            res.status(400).send({
                message: "Esta rifa ya ha sido sorteada."
            });
            return;
        }

        // Obtener todos los participantes de la rifa
        const participantes = await db.usuarioParticipantes.findAll({
            where: { idRifa: rifaId }
        });

        // Verificar si hay suficientes participantes para realizar el sorteo
        if (participantes.length < cantidadGanadores) {
            res.status(400).send({
                message: "No hay suficientes participantes para realizar el sorteo."
            });
            return;
        }

        // Realizar el sorteo de los ganadores
        const ganadores = [];
        for (let i = 0; i < cantidadGanadores; i++) {
            const indiceGanador = Math.floor(Math.random() * participantes.length);
            ganadores.push(participantes[indiceGanador]);
            participantes.splice(indiceGanador, 1);
            //actualizar el estado del participante a ganador
            await db.usuarioParticipantes.update({ ganador: true }, {
                where: { id: ganadores[i].id }
            });
            ganadores[i].ganador = true;
        }


        // Actualizar el estado de la rifa a "sorteada"
        await rifa.update({ estado: "sorteada" });

        res.send(ganadores);
    } catch (error) {
        console.error("Error al iniciar el sorteo de la rifa:", error);
        res.status(500).send({
            message: "Ocurrió un error al iniciar el sorteo de la rifa."
        });
    }
};


exports.ganadoresByRifa = async (req, res) => {
    const rifaId = req.params.id;
    try {
        const ganadores = await db.usuarioParticipantes.findAll({
            where: { idRifa: rifaId, ganador: true },
            include: "usuario"
        });
        res.send(ganadores);    
    } catch (error) {
        console.error("Error al obtener los ganadores de la rifa:", error);
        res.status(500).send({
            message: "Ocurrió un error al obtener los ganadores de la rifa."
        });
    }
};

exports.edit = async (req, res) => {
    const rifaId = req.params.id;
    const { nombre } = req.body;

    try {
        const rifa = await db.rifas.findByPk(rifaId);
        if (!rifa) {
            res.status(404).send({
                message: `No se encontró la rifa con id=${rifaId}.`
            });
            return;
        }

        await rifa.update({ nombre });
        res.send(rifa);
    } catch (error) {
        console.error("Error al editar la rifa:", error);
        res.status(500).send({
            message: "Ocurrió un error al editar la rifa."
        });
    }
};

exports.delete = async (req, res) => {
    const rifaId = req.params.id;

    try {
        const rifa = await db.rifas.findByPk(rifaId);
        if (!rifa) {
            res.status(404).send({
                message: `No se encontró la rifa con id=${rifaId}.`
            });
            return;
        }

        await rifa.destroy();
        res.send({ message: "Rifa eliminada exitosamente." });
    } catch (error) {
        console.error("Error al eliminar la rifa:", error);
        res.status(500).send({
            message: "Ocurrió un error al eliminar la rifa."
        });
    }
}