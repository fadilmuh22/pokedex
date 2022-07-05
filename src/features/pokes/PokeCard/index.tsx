import { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';

import { PokeDetailData, PokePaginationData } from '~/features/pokes/PokeType';
import { fetchPokeDetail } from '../PokeApi';
import { PokeColors } from '../PokeColors';

import styles from './PokeCard.module.css';
import PokeBall from '~/assets/pokeball.svg';
import Link from 'next/link';

export const PokeCard = ({ name, url }: PokePaginationData) => {
  const [pokeDetail, setPokeDetail] = useState({} as PokeDetailData);

  const isPokeDetailEmpty = () => Object.keys(pokeDetail).length == 0;

  useEffect(() => {
    if (name) {
      fetchPokeDetail(name).then((res) => {
        setPokeDetail(res.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <Link href={`/poke/${name}`}>
      <Flex
        className={styles.cardContainer}
        style={{
          backgroundColor: isPokeDetailEmpty()
            ? 'white'
            : PokeColors.colors.type[pokeDetail.types[0].type.name],
        }}
      >
        <p className={styles.pokeName}>{name}</p>

        {isPokeDetailEmpty() ? (
          <div>Detail can&apos;t be loaded</div>
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
                src={pokeDetail.sprites.other?.['official-artwork'].front_default!}
                alt="pokemon-name"
              />
            </div>
          </Flex>
        )}
      </Flex>
    </Link>
  );
};
