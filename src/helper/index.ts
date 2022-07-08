export const pokeIdUrlToImageUrl = (url: string) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
    url.split('/')[6]
  }.png`;
};
