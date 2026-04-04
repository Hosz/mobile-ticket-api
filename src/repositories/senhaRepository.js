import { Op } from 'sequelize';
import Senha from '../models/Senha.js';
import { endOfDay, startOfDay } from '../utils/dateRange.js';

export async function countSenhasByTipoAndPrefix(tipo, prefix) {
  return Senha.count({
    where: {
      tipo,
      numeracao: {
        [Op.like]: `${prefix}%`,
      },
    },
  });
}

export async function createSenha(data) {
  return Senha.create(data);
}

export async function findSenhaById(id) {
  return Senha.findByPk(id);
}

export async function findFirstWaitingSenhaByTipo(tipo) {
  return Senha.findOne({
    where: {
      tipo,
      status: 'AGUARDANDO',
    },
    order: [
      ['emitida_em', 'ASC'],
      ['id', 'ASC'],
    ],
  });
}

export async function findLastCalledSenhaToday() {
  return Senha.findOne({
    where: {
      chamada_em: {
        [Op.ne]: null,
        [Op.between]: [startOfDay(), endOfDay()],
      },
    },
    order: [['chamada_em', 'DESC']],
  });
}

export async function findLatestCalledSenhas(limit = 5) {
  return Senha.findAll({
    where: {
      chamada_em: {
        [Op.ne]: null,
      },
    },
    order: [['chamada_em', 'DESC']],
    limit,
  });
}

export async function saveSenha(senha) {
  return senha.save();
}
