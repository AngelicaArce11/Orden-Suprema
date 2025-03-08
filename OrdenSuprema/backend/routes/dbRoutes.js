import { Router } from "express";
import { loginUser } from "../controllers/authController.js";  
import { verifyToken, verifyRole } from "../middlewares/auth.js";

import {
  getAllDebts,
  createDebt,
  updateDebt,
  deleteDebt,
  getDebtByCreditorId,
  getDebtByDebtorId, 
  getDebtsWithoutProof,
  updateDebtWithProof,
  getDebtImage,
  confirmDebt
} from "../controllers/debtController.js";

import {
  getAllMissions,
  getFilteredMissions,
  getUnreviewedMissions,
  getMissionImage,
  createMission,
  acceptMission,
  completeMission,
  confirmMission,
  updateMission,
  deleteMission,
  getMissionsAssignedTo,
  getMissionsAssignedToByStatus,
  uploadMiddleware
} from "../controllers/missionController.js";

import {
  getAllUsers,
  getAllAssassins,
  getUser,
  getAllOrder,
  createAssassin,
  createOrder,
  updateUserCoins,
  updateUserLocation
} from "../controllers/userController.js";


const router = Router();

//Login
router.post("/login", loginUser);

 //Debts
router.get('/debt', getAllDebts);
router.post('/debt', createDebt);
router.put('/debt/:id', updateDebt);
router.delete('/debt/:id', deleteDebt);
router.get('/debt/:id/creditor', getDebtByCreditorId);
router.get('/debt/:id/debtor', getDebtByDebtorId);
router.put('/debt/complete/:id', uploadMiddleware, confirmDebt);
router.get('/debt/image/:id', getDebtImage);
router.get('/debt/:id/no-proof', getDebtsWithoutProof);  
router.put('/debt/:debtId/proof', updateDebtWithProof);  


router.put('/debt/complete/:id', uploadMiddleware, confirmDebt);


 //Missions
router.get('/Mission', getAllMissions);
router.get('/FilteredMission', getFilteredMissions);
router.get('/Mission/Review', getUnreviewedMissions);
router.get('/Mission/:id/PublishedBy');
router.get('/Mission/AssignedTo/:id', getMissionsAssignedTo);
router.get('/Mission/AssignedTo/:id/status', getMissionsAssignedToByStatus);
router.get('/Mission/image/:id', getMissionImage);


router.post('/Mission', createMission);
router.put('/Mission/accept/:id', acceptMission);
router.put('/Mission/complete/:id', uploadMiddleware, completeMission);
router.put('/Mission/confirm/:id', confirmMission);
router.delete('/Mission/delete/:id', deleteMission);
router.get('/Mission/:id');
router.put('/Mission/submitProof/:userId', updateDebtWithProof);

 //Users
router.get('/User', getAllUsers);
router.get('/UserById/:id', getUser);
router.get('/User/Assassin', getAllAssassins);
router.get('/User/Order', getAllOrder);

// router.post('/User/Assassin', verifyToken, verifyRole(["order"]), createAssassin);
router.post('/User/Assassin', createAssassin);
router.post('/User/Order', createOrder);

router.put('/UserById/:id', updateUserCoins);
router.put('/UserById/location/:id', updateUserLocation);
router.delete('/UserById/:id');


export default router;