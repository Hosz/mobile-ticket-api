import Guiche from '../models/Guiche.js';

export async function findAllGuiches() {
  return Guiche.findAll();
}

export async function findGuicheById(id) {
  return Guiche.findByPk(id);
}

export async function findGuicheByNumero(numero) {
  return Guiche.findOne({
    where: { numero },
  });
}

export async function findGuichesByIds(ids) {
  return Guiche.findAll({
    where: {
      id: ids,
    },
  });
}

export async function createGuiche(data) {
  return Guiche.create(data);
}

export async function saveGuiche(guiche) {
  return guiche.save();
}

export async function deleteGuiche(guiche) {
  return guiche.destroy();
}
