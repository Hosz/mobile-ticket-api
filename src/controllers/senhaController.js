import { emitirSenha } from '../services/senhaService.js';

export async function emitir(req, res) {
  try {
    const senha = await emitirSenha(req.body);
    res.status(201).json(senha);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ erro: error.message || 'Erro ao emitir senha.' });
  }
}
