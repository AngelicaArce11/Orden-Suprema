import { Debt } from "../database/models/Debt.js";

export const getAllDebts = async (req, res) => {
    try {
        const debts = await Debt.findAll();
        res.json(debts);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

//Controlador para obtener todas las deudas por usuario
export const getDebtByCreditorId = async (req, res) => {
    try {
        const { id } = req.params;
        const creditorId = Number(id);

        if (!creditorId || creditorId <= 0) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const creditorExists = await Creditor.findByPk(creditorId);
        if (!creditorExists) {
            return res.status(404).json({ message: 'Acreedor no encontrado' });
        }

        const debtCreditor = await Debt.findAll({
            where: {
                creditorId
            }
        });

        if (debtCreditor.length === 0) {
            return res.status(404).json({ message: 'Deudas no encontradas' });
        }

        res.json(debtCreditor);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

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

