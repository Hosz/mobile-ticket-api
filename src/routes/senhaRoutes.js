import express from 'express';
import { emitir } from '../controllers/SenhaController.js';

const router = express.Router();

router.post('/', emitir);

export default router;