import express from 'express';
import { chamar, naoCompareceu } from '../controllers/filaController.js';

const router = express.Router();

router.post('/chamar-proxima', chamar);
router.post('/nao-compareceu', naoCompareceu);

export default router;
