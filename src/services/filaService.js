import { createHttpError } from '../utils/httpError.js';
import {
  findGuicheByNumero,
  findGuichesByIds,
} from '../repositories/guicheRepository.js';
import {
  findFirstWaitingSenhaByTipo,
  findLastCalledSenhaToday,
  findLatestCalledSenhas,
  findSenhaById,
  saveSenha,
} from '../repositories/senhaRepository.js';

function chooseNextSenha({ lastCalledSenha, prioridadeSenha, exameSenha, geralSenha }) {
  if (!lastCalledSenha) {
    return prioridadeSenha || exameSenha || geralSenha || null;
  }

  if (lastCalledSenha.tipo === 'SP') {
    return exameSenha || geralSenha || prioridadeSenha || null;
  }

  return prioridadeSenha || exameSenha || geralSenha || null;
}

function registerSenhaCall(senha, guiche) {
  senha.status = 'CHAMADA';
  senha.chamada_em = new Date();
  senha.guiche_id = guiche.id;
}

function validateNaoComparecimento(senha, guiche) {
  if (!['CHAMADA', 'EM_ATENDIMENTO'].includes(senha.status)) {
    throw createHttpError(
      'A senha informada nao pode ser marcada como nao compareceu.',
      409,
    );
  }

  if (guiche && senha.guiche_id && senha.guiche_id !== guiche.id) {
    throw createHttpError(
      'A senha informada esta associada a outro guiche.',
      409,
    );
  }
}

function toSenhaChamadaResponse(senha, guiche) {
  return {
    id: senha.id,
    numero: senha.numeracao,
    tipo: senha.tipo,
    status: senha.status,
    guiche: guiche.numero,
    chamada_em: senha.chamada_em,
  };
}

function toNaoCompareceuResponse(senha) {
  return {
    id: senha.id,
    numero: senha.numeracao,
    tipo: senha.tipo,
    status: senha.status,
    guiche_id: senha.guiche_id,
  };
}

export async function chamarProximaSenha(body = {}) {
  const guicheNumero = Number(body.guiche);

  if (!Number.isInteger(guicheNumero) || guicheNumero <= 0) {
    throw createHttpError('Informe um guiche valido.', 400);
  }

  const guiche = await findGuicheByNumero(guicheNumero);

  if (!guiche) {
    throw createHttpError('Guiche nao encontrado.', 404);
  }

  const [lastCalledSenha, prioridadeSenha, exameSenha, geralSenha] = await Promise.all([
    findLastCalledSenhaToday(),
    findFirstWaitingSenhaByTipo('SP'),
    findFirstWaitingSenhaByTipo('SE'),
    findFirstWaitingSenhaByTipo('SG'),
  ]);

  const nextSenha = chooseNextSenha({
    lastCalledSenha,
    prioridadeSenha,
    exameSenha,
    geralSenha,
  });

  if (!nextSenha) {
    return null;
  }

  registerSenhaCall(nextSenha, guiche);
  await saveSenha(nextSenha);

  return toSenhaChamadaResponse(nextSenha, guiche);
}

export async function listarUltimasChamadas() {
  const senhas = await findLatestCalledSenhas();

  if (!senhas.length) {
    return [];
  }

  const guicheIds = [...new Set(senhas.map((senha) => senha.guiche_id).filter(Boolean))];
  const guiches = await findGuichesByIds(guicheIds);
  const guicheMap = new Map(guiches.map((guiche) => [guiche.id, guiche.numero]));

  return senhas.map((senha) => ({
    id: senha.id,
    numero: senha.numeracao,
    tipo: senha.tipo,
    guiche: guicheMap.get(senha.guiche_id) || null,
    chamada_em: senha.chamada_em,
  }));
}

export async function marcarNaoComparecimento(body = {}) {
  const senhaId = Number(body.senhaId);

  if (!Number.isInteger(senhaId) || senhaId <= 0) {
    throw createHttpError('Informe uma senha valida.', 400);
  }

  const senha = await findSenhaById(senhaId);

  if (!senha) {
    throw createHttpError('Senha nao encontrada.', 404);
  }

  let guiche = null;
  if (body.guiche != null) {
    const guicheNumero = Number(body.guiche);

    if (!Number.isInteger(guicheNumero) || guicheNumero <= 0) {
      throw createHttpError('Informe um guiche valido.', 400);
    }

    guiche = await findGuicheByNumero(guicheNumero);

    if (!guiche) {
      throw createHttpError('Guiche nao encontrado.', 404);
    }
  }

  validateNaoComparecimento(senha, guiche);
  senha.status = 'NAO_COMPARECEU';
  await saveSenha(senha);

  return toNaoCompareceuResponse(senha);
}
