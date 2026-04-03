import Senha from '../models/Senha.js';

export const emitir = async (req, res) => {
  try {
    const { tipo } = req.body;

    const agora = new Date();
    const yy = String(agora.getFullYear()).slice(-2);
    const mm = String(agora.getMonth() + 1).padStart(2, '0');
    const dd = String(agora.getDate()).padStart(2, '0');

    // Conta quantas senhas do mesmo tipo foram emitidas hoje
    const hoje = `${yy}${mm}${dd}`;
    const quantidade = await Senha.count({
      where: { tipo, codigo: { [sequelize.Op.like]: `${hoje}%` } }
    });

    const sq = String(quantidade + 1).padStart(2, '0');
    const codigo = `${hoje}-${tipo}${sq}`;

    const senha = await Senha.create({ codigo, tipo, sequencia: quantidade + 1 });

    res.status(201).json(senha);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao emitir senha.' });
  }
};