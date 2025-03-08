import { Debt } from "../database/models/Debt.js";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

//Para obtener todas las deudas
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

//Para obtener la imagen
export const getDebtImage = async (req, res) => {
    try {
      const { id } = req.params;
      const debt = await Debt.findByPk(id);
  
      if (!debt || !debt.image) {
        return res.status(404).json({ message: "Imagen no encontrada" });
      }
  
      res.setHeader("Content-Type", "image/png"); // Ajusta el formato si es necesario
      res.send(debt.image);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

export const createDebt = async (req, res) => {
    try {
        const {description, creditorId, debtorId} = req.body
        const newDebt = await Debt.create({
            description: description,
            is_completed: false,
            debtorId: debtorId,
            creditorId: creditorId
        });
        res.json(newDebt);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

export const updateDebt = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_completed } = req.body; 
        const debt = await Debt.findByPk(id);

        if (!debt) {
            return res.status(404).json({ message: "Deuda no encontrada" });
        }
        debt.is_completed = is_completed;
        await debt.save();

        return res.json({ debt });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const confirmDebt = async (req, res) => {
  try {
    const { id } = req.params;

    const debt = await Debt.findByPk(id);
    if (!debt) {
        return res.status(404).json({ message: "Deuda no encontrada" });
      }
    debt.proofImage = `robohash.org/set_set1/bgset_bg1/${id}`;
    debt.image = req.file.buffer;
    debt.status = "under_review";
    await debt.save();

    res.json(mission);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

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


// GET - Obtener deudas con `proof_image` en NULL
export const getDebtsWithoutProof = async (req, res) => {
    try {
        const { id } = req.params;
        const debtorId = parseInt(id, 10);

        if (isNaN(debtorId) || debtorId <= 0) {
            return res.status(400).json({ message: 'ID inválido' });
        }

        const debts = await Debt.findAll({
            where: {
                debtorId: debtorId,
                proof_image: null
            }
        });

        if (!debts || debts.length === 0) {
            return res.status(404).json({ message: 'No se encontraron deudas pendientes con comprobante.' });
        }

        res.json(debts);
    } catch (error) {
        console.error('Error al obtener las deudas:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// PUT - Actualizar deuda con comprobante de pago

export const updateDebtWithProof = async (req, res) => {
    try {
        console.log('ID de la deuda recibido:', req.params.debtId);  // 🔎 Verifica que el ID llega correctamente
        console.log('Imagen recibida:', req.body.proof_image);
        const { debtId } = req.params;
        const { proof_image } = req.body;  // Recibir la imagen como base64 o URL

        
        if (!proof_image) {
            return res.status(400).json({ message: 'No se recibió ninguna imagen.' });
        }

        const debt = await Debt.findByPk(debtId);

        if (!debt) {
            return res.status(404).json({ message: 'Deuda no encontrada.' });
        }

        // Actualización del campo `proof_image`
        await debt.update({ proof_image });

        res.json({ message: 'Comprobante guardado exitosamente.', proof_image });

    } catch (error) {
        console.error('Error al actualizar la deuda:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

