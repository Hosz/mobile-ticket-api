import express from 'express';
import { emitir } from '../controllers/senhaController.js';
import { chamar, ultimas, naoCompareceu } from '../controllers/filaController.js';

const router = express.Router();

router.post('/', emitir);
router.post('/chamar', chamar);
router.post('/nao-compareceu', naoCompareceu);
router.get('/ultimas', ultimas);

export default router;