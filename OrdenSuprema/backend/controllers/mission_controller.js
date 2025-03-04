import { Mission } from "../database/models/Mission.js";

export const getAllMissions = async (req, res) => {
    try {
        const missions = await Mission.findAll();
        res.json(missions);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createMission = async (req, res) => {
    try {
        const {targetName, description, paymentValue} = req.body
        const newMission = await Mission.create({
            targetName: targetName,
            description: description,
            paymentValue: paymentValue
        });
        res.json(newMission);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const updateMission = async (req, res) => {
    try {
    const { id } = req.params
    //Pendiente por implementar
    res.sendStatus(501);
    } catch (error) {
        return res.status(500).json({message: error.message});
}};

export const deleteMission = async (req, res) => {
    try {
        const { id } = req.params
        await Mission.destroy({
            where: {
                id
            }
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};