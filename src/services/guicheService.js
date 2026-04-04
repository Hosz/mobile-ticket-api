import { createHttpError } from '../utils/httpError.js';
import {
  createGuiche,
  deleteGuiche,
  findAllGuiches,
  findGuicheById,
  saveGuiche,
} from '../repositories/guicheRepository.js';

function parseNumero(numero) {
  const parsed = Number(numero);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw createHttpError('O campo numero deve ser um inteiro positivo.', 400);
  }

  return parsed;
}

function toGuicheResponse(guiche) {
  return {
    id: guiche.id,
    numero: guiche.numero,
    status: guiche.status,
    created_at: guiche.created_at,
    updated_at: guiche.updated_at,
  };
}

export async function listarGuiches() {
  const guiches = await findAllGuiches();
  return guiches.map(toGuicheResponse);
}

export async function criarGuiche(body = {}) {
  const guiche = await createGuiche({
    numero: parseNumero(body.numero),
  });

  return toGuicheResponse(guiche);
}

export async function atualizarGuiche(id, body = {}) {
  if (!id) {
    throw createHttpError('Informe o id do guiche.', 400);
  }

  const guiche = await findGuicheById(id);

  if (!guiche) {
    throw createHttpError('Guiche nao encontrado.', 404);
  }

  if (body.numero !== undefined) {
    guiche.numero = parseNumero(body.numero);
  }

  if (body.status !== undefined) {
    if (!['livre', 'ocupado'].includes(body.status)) {
      throw createHttpError('O campo status deve ser "livre" ou "ocupado".', 400);
    }

    guiche.status = body.status;
  }

  if (body.numero === undefined && body.status === undefined) {
    throw createHttpError('Informe pelo menos um campo para atualizar.', 400);
  }

  await saveGuiche(guiche);
  return toGuicheResponse(guiche);
}

export async function deletarGuiche(id) {
  if (!id) {
    throw createHttpError('Informe o id do guiche.', 400);
  }

  const guiche = await findGuicheById(id);

  if (!guiche) {
    throw createHttpError('Guiche nao encontrado.', 404);
  }

  await deleteGuiche(guiche);
  return { mensagem: 'Guiche deletado com sucesso.' };
}
