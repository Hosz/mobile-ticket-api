import {
  chamarProximaSenha,
  listarUltimasChamadas,
  marcarNaoComparecimento,
} from '../services/filaService.js';

export async function chamar(req, res) {
  try {
    const senha = await chamarProximaSenha(req.body);

    if (!senha) {
      return res.status(404).json({ mensagem: 'Nenhuma senha aguardando na fila.' });
    }

    return res.json(senha);
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      erro: error.message || 'Erro ao chamar proxima senha.',
    });
  }
}

export async function ultimas(req, res) {
  try {
    const chamadas = await listarUltimasChamadas();
    return res.json(chamadas);
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      erro: error.message || 'Erro ao buscar ultimas chamadas.',
    });
  }
}

export async function naoCompareceu(req, res) {
  try {
    const senha = await marcarNaoComparecimento(req.body);
    return res.json(senha);
  } catch (error) {
    console.error(error);
    return res.status(error.status || 500).json({
      erro: error.message || 'Erro ao marcar nao comparecimento.',
    });
  }
}
