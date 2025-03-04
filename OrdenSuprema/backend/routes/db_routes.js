import { Router } from "express";
const router = Router();
import {
    getAllDebts,
    createDebt,
    updateDebt,
    deleteDebt
 } from "../controllers/debt_controller.js";

 //Debts
router.get('/debt', getAllDebts);
router.post('/debt', createDebt);
router.put('/debt:id', updateDebt);
router.delete('/debt/:id', deleteDebt);
router.get('/debt/:id');

 //Missions
router.get('/Mission');
router.post('/Mission');
router.put('/Mission:id');
router.delete('/Mission/:id');
router.get('/Mission/:id');

 //Transactions
router.get('/Transaction');
router.post('/Transaction');
router.put('/Transaction:id');
router.delete('/Transaction/:id');
router.get('/Transaction/:id');

 //Users
router.get('/User');
router.post('/User');
router.put('/User:id');
router.delete('/User/:id');
router.get('/User/:id');

  

export default router;