import { Mission } from "../database/models/Mission.js";

// Para obtener todas las misiones
export const getAllMissions = async (req, res) => {
    try {
        const missions = await Mission.findAll();
        res.json(missions);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

// Para obtener solo las misiones que no han sido asignadas
export const getFilteredMissions = async (req, res) => {
    try {
        const missions = await Mission.findAll({
            where: {
                status: 'unassigned'
            }
        });
        res.json(missions);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

// Para obtener solo las misiones de un asesino en especifico
export const getMissionsAssignedTo = async (req, res) => {
    try {
        const { id } = req.params
        const missions = await Mission.findAll({
            where: {
                assignedToId: id
            }
        });
        res.json(missions);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

// Para obtener solo las misiones que no han sido revisadas por la orden
export const getUnreviewedMissions = async (req, res) => {
    try {
        const missions = await Mission.findAll({
            where: {
                status: 'under_review'
            }
        });
        res.json(missions);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

// Para crear una mision
export const createMission = async (req, res) => {
    try {
        const {targetName, description, paymentValue, publishedById} = req.body
        console.log(req.body);
        const newMission = await Mission.create({
            targetName: targetName,
            description: description,
            paymentValue: paymentValue,
            publishedById: publishedById
        });
        res.json(newMission);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

// Para actualizar una mision
export const updateMission = async (req, res) => {
    try {
    const { id } = req.params
    //Pendiente por implementar
    res.sendStatus(501);
    } catch (error) {
        return res.status(500).json({message: error.message});
}};

export const acceptMission = async (req, res) => {
    try {
    const { id } = req.params;
    const { assignedToId } = req.body;

    const mission = await Mission.findByPk(id);
    mission.assignedToId = assignedToId;
    mission.status = 'in_progress';
    await mission.save();

    res.json(mission);
    } catch (error) {
        return res.status(500).json({message: error.message});
}};

export const completeMission = async (req, res) => {
    try {
    const { id } = req.params;
    const { proofImage } = req.body;

    const mission = await Mission.findByPk(id);
    mission.proofImage = proofImage;
    mission.status = 'under_review';
    await mission.save();

    res.json(mission);
    } catch (error) {
        return res.status(500).json({message: error.message});
}};

export const confirmMission = async (req, res) => {
    try {
        const { id } = req.params;
        const { isConfirmed } = req.body;

        const mission = await Mission.findByPk(id);
        if (isConfirmed) {
            mission.status = "completed";
        } else {
            mission.status = "failed";
        }
        await mission.save();
        res.json(mission);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteMission = async (req, res) => {
    try {
        const { id } = req.params
        const deletedRows = await Mission.destroy({
            where: {
                id
            }
        });

        if (deletedRows === 0) {
            return res.status(404).json({ message: "Misión no encontrada" });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};