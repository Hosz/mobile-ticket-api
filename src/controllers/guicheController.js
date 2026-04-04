import {
  atualizarGuiche,
  criarGuiche,
  deletarGuiche,
  listarGuiches,
} from '../services/guicheService.js';

export async function listar(req, res) {
  try {
    const guiches = await listarGuiches();
    res.json(guiches);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ erro: error.message || 'Erro ao listar guiches.' });
  }
}

export async function criar(req, res) {
  try {
    const guiche = await criarGuiche(req.body);
    res.status(201).json(guiche);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ erro: error.message || 'Erro ao criar guiche.' });
  }
}

export async function atualizar(req, res) {
  try {
    const guiche = await atualizarGuiche(req.params.id, req.body);
    res.json(guiche);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ erro: error.message || 'Erro ao atualizar guiche.' });
  }
}

export async function deletar(req, res) {
  try {
    const response = await deletarGuiche(req.params.id);
    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ erro: error.message || 'Erro ao deletar guiche.' });
  }
}
