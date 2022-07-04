import { useEffect, useState } from 'react';
import { background, Flex } from '@chakra-ui/react';

import api from '../services/api';
import { PokeDetail, PokePagination } from '../types/Poke';

import styles from '../styles/Card.module.css';

import PokeBall from '~/assets/pokeball.svg';
import PokeColors from '~/styles/Colors';

export default function Card({ name, url }: PokePagination) {
  const [pokeDetail, setPokeDetail] = useState({} as PokeDetail);

  useEffect(() => {
    if (name) {
      api.get(`/pokemon/${name}`).then((res) => {
        setPokeDetail(res.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <Flex
      className={styles.cardContainer}
      style={{
        backgroundColor: !pokeDetail.name
          ? 'white'
          : PokeColors.colors.type[pokeDetail.types[0].type.name],
      }}
    >
      <p className={styles.pokeName}>{name}</p>

      {!pokeDetail.name ? (
        // eslint-disable-next-line react/no-unescaped-entities
        <div>Detail can't be loaded</div>
      ) : (
        <Flex flexDirection={'row'} position={'relative'}>
          <Flex flexDirection={'column'}>
            {pokeDetail.types.map((t, idx) => (
              <div className={styles.pokeType} key={idx}>
                <p>{t.type.name}</p>
              </div>
            ))}
          </Flex>
          <div className={styles.pokeImage}>
            <PokeBall />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pokeDetail.sprites.other?.['official-artwork'].front_default}
              alt="pokemon-name"
            />
          </div>
        </Flex>
      )}
    </Flex>
  );
}
