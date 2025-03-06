import { Debt } from "../database/models/Debt.js";

export const getAllDebts = async (req, res) => {
    try {
        const debts = await Debt.findAll();
        res.json(debts);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const createDebt = async (req, res) => {
    try {
        const {description, creditorId, debtorId} = req.body
        const newDebt = await Debt.create({
            description,
            debtorId,
            creditorId
        });
        res.json(newDebt);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const updateDebt = async (req, res) => {
    try {
    const { id } = req.params
    //Pendiente por implementar
    res.sendStatus(501);
    } catch (error) {
        return res.status(500).json({message: error.message});
}};

export const deleteDebt = async (req, res) => {
    try {
        const { id } = req.params
        await Debt.destroy({
            where: {
                id
            }
        });
        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};