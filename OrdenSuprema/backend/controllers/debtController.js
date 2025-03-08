import { Debt } from "../database/models/Debt.js";

export const getAllDebts = async (req, res) => {
    try {
        const debts = await Debt.findAll();
        res.json(debts);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};
// Controlador para obtener todas las deudas del acreedor
export const getDebtByCreditorId = async (req, res) => {
    try {
        const { id } = req.params;
        const creditorId = parseInt(id, 10);

        if (isNaN(creditorId) || creditorId <= 0) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const debtCreditor = await Debt.findAll({ where: { creditorId } });

        if (!debtCreditor || debtCreditor.length === 0) {
            return res.status(404).json({ message: 'No se encontraron deudas para este acreedor.' });
        }

        res.json(debtCreditor);

    } catch (error) {
        console.error("Error en el controlador de acreedor:", error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Controlador para obtener todas las deudas del deudor
export const getDebtByDebtorId = async (req, res) => {
    try {
        const { id } = req.params;
        const debtorId = parseInt(id, 10);

        if (isNaN(debtorId) || debtorId <= 0) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const debtDebtor = await Debt.findAll({ where: { debtorId } });

        if (!debtDebtor || debtDebtor.length === 0) {
            return res.status(404).json({ message: 'No se encontraron deudas para este deudor.' });
        }

        res.json(debtDebtor);

    } catch (error) {
        console.error("Error en el controlador de deudor:", error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
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

