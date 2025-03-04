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
        const {targetName, description, paymentValue, publishedById} = req.body
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