import api from '~/services/api';

export const fetchPokeList = (paginationOffset: number) => {
  return api.get(`/pokemon?limit=12&offset=${paginationOffset}`);
};

export const fetchPokeDetail = (name: string) => {
  return api.get(`/pokemon/${name}`);
};

export const fetchPokeSpecies = (name: string) => {
  return api.get(`/pokemon-species/${name}`);
};
