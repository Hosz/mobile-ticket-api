import { createHttpError } from '../utils/httpError.js';
import { countSenhasByTipoAndPrefix, createSenha } from '../repositories/senhaRepository.js';

function buildSenhaPrefix(date = new Date()) {
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yy}${mm}${dd}`;
}

export async function emitirSenha(body = {}) {
  if (!['SP', 'SG', 'SE'].includes(body.tipo)) {
    throw createHttpError('O campo tipo deve ser SP, SG ou SE.', 400);
  }

  const prefix = buildSenhaPrefix();
  const quantity = await countSenhasByTipoAndPrefix(body.tipo, prefix);
  const sequence = String(quantity + 1).padStart(2, '0');
  const codigo = `${prefix}-${body.tipo}${sequence}`;

  await createSenha({
    numeracao: codigo,
    tipo: body.tipo,
  });

  return {
    codigo,
    tipo: body.tipo,
    status: 'AGUARDANDO',
  };
}
