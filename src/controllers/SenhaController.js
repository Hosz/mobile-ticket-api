import Senha from '../models/Senha.js';
import { Op } from 'sequelize';

export const emitir = async (req, res) => {
  try {
    const { tipo } = req.body;

    const agora = new Date();
    const yy = String(agora.getFullYear()).slice(-2);
    const mm = String(agora.getMonth() + 1).padStart(2, '0');
    const dd = String(agora.getDate()).padStart(2, '0');
    const hoje = `${yy}${mm}${dd}`;

    const quantidade = await Senha.count({
      where: { tipo, numeracao: { [Op.like]: `${hoje}%` } }
    });

    const sq = String(quantidade + 1).padStart(2, '0');
    const numeracao = `${hoje}-${tipo}${sq}`;

    await Senha.create({ numeracao, tipo });

    res.status(201).json({ codigo: numeracao, tipo, status: 'AGUARDANDO' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao emitir senha.' });
  }
};