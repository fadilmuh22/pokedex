import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const fetchPokeList = (paginationOffset: number) => {
  return api.get(`/pokemon?limit=12&offset=${paginationOffset}`);
};

export const fetchPokeDetail = (name: string) => {
  return api.get(`/pokemon/${name}`);
};

export const fetchPokeSpecies = (name: string) => {
  return api.get(`/pokemon-species/${name}`);
};

export default api;
