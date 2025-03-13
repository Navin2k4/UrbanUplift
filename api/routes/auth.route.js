import express from 'express';
import { 
  registerCitizen,
  loginCitizen,
  registerNGO,
  loginNGO,
  registerGovernment,
  loginGovernment,
  registerCollege,
  loginCollege
} from '../controllers/auth.controller.js';

const router = express.Router();

// Citizen routes
router.post('/citizen/register', registerCitizen);
router.post('/citizen/login', loginCitizen);

// NGO routes
router.post('/ngo/register', registerNGO);
router.post('/ngo/login', loginNGO);

// Government routes
router.post('/government/register', registerGovernment);
router.post('/government/login', loginGovernment);

// College routes
router.post('/college/register', registerCollege);
router.post('/college/login', loginCollege);

export default router;
