import Guiche from '../models/Guiche.js';

// GET /guiches - Lista todos os guiches
export const listar = async (req, res) => {
  try {
    const guiches = await Guiche.findAll();
    res.json(guiches);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar guiches.' });
  }
};

// POST /guiches - Cria novo guiche
export const criar = async (req, res) => {
  try {
    const { numero } = req.body;
    const guiche = await Guiche.create({ numero });
    res.status(201).json(guiche);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar guiche.' });
  }
};

// PUT /guiches/:id - Atualiza guiche
export const atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { numero, status } = req.body;
    const guiche = await Guiche.findByPk(id);
    if (!guiche) return res.status(404).json({ erro: 'Guiche nao encontrado.' });
    await guiche.update({ numero, status });
    res.json(guiche);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar guiche.' });
  }
};

// DELETE /guiches/:id - Deleta guiche
export const deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const guiche = await Guiche.findByPk(id);
    if (!guiche) return res.status(404).json({ erro: 'Guiche nao encontrado.' });
    await guiche.destroy();
    res.json({ mensagem: 'Guiche deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar guiche.' });
  }
};