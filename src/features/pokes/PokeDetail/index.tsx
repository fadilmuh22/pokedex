import { Box, Flex } from '@chakra-ui/react';

import { PokeDetailData } from '../PokeType';

import { PokeDetailTabs } from './DetailTabs';

import PokeBall from '~/assets/pokeball.svg';
import styles from './style.module.css';

export const PokeDetail = ({
  name,
  pokeDetail,
  pokeSpecies,
  pokeEvoChain,
  pokeEvo,
}: {
  name: string;
  pokeDetail: PokeDetailData;
  pokeSpecies: any;
  pokeEvoChain: any;
  pokeEvo: any[];
}) => {
  const isPokeDetailEmpty = () => !pokeDetail || Object.keys(pokeDetail).length == 0;
  const isPokeSpeciesEmpty = () =>
    !pokeSpecies || Object.keys(pokeSpecies).length == 0;

  return (
    <Box className="pokeDetailComponent" w={'100%'} h={'100%'} position={'relative'}>
      {isPokeDetailEmpty() ? (
        <div>Detail can&apos;t be loaded</div>
      ) : (
        <div>
          <Flex
            flexDirection={'row'}
            justifyContent={'space-between'}
            position={'relative'}
          >
            <Flex flexDirection={'column'}>
              <p className={styles.pokeName}>{name}</p>

              <Flex flexDirection={'row'}>
                {pokeDetail.types.map((t, idx) => (
                  <div className={styles.pokeType} key={idx}>
                    <p>{t.type.name}</p>
                  </div>
                ))}
              </Flex>
            </Flex>

            <p className={styles.pokeId}>#{pokeDetail.id}</p>
          </Flex>

          <PokeBall className={styles.pokeBallArt} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.pokeImageArt}
            src={pokeDetail.sprites.other?.['official-artwork'].front_default!}
            alt="pokemon-name"
          />

          <div className={styles.pokeDetailTabContainer}>
            {isPokeSpeciesEmpty() ? (
              <div></div>
            ) : (
              <PokeDetailTabs
                pokeDetail={pokeDetail}
                pokeSpecies={pokeSpecies}
                pokeEvoChain={pokeEvoChain}
                pokeEvo={pokeEvo}
              />
            )}
          </div>
        </div>
      )}
    </Box>
  );
};
