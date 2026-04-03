import express from 'express';
import { listar, criar, atualizar, deletar } from '../controllers/guicheController.js';

const router = express.Router();

router.get('/', listar);
router.post('/', criar);
router.put('/:id', atualizar);
router.delete('/:id', deletar);

export default router;