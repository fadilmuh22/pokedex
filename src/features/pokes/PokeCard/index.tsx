import { useEffect } from 'react';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Flex } from '@chakra-ui/react';

import { PokeColors } from '../PokeColors';
import styles from './style.module.css';
import PokeBall from '~/assets/pokeball.svg';

import { fetchPokeDetailAsync, selectPokeDetail } from '../PokeSlice';
import { useAppDispatch } from '~/app/hooks';
import { PokePaginationData } from '../PokeType';

export const PokeCard = ({ name, url }: PokePaginationData) => {
  const dispatch = useAppDispatch();
  const pokeDetail = useSelector(selectPokeDetail)[name];

  useEffect(() => {
    if (name) {
      dispatch(fetchPokeDetailAsync(name));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const isPokeDetailEmpty = () => !pokeDetail || Object.keys(pokeDetail).length == 0;

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
