import {
  Box,
  Flex,
  Progress,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import { PokeDetailData } from '../PokeType';

import PokeBall from '~/assets/pokeball.svg';
import styles from './PokeDetail.module.css';

export const PokeDetail = ({
  name,
  pokeDetail,
  pokeSpecies,
}: {
  name: string;
  pokeDetail: PokeDetailData;
  pokeSpecies: any;
}) => {
  const isPokeDetailEmpty = () => Object.keys(pokeDetail).length == 0;
  const isPokeSpeciesEmpty = () => Object.keys(pokeSpecies).length == 0;

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
              <PokeDetailTabs pokeDetail={pokeDetail} pokeSpecies={pokeSpecies} />
            )}
          </div>
        </div>
      )}
    </Box>
  );
};

const PokeDetailTabs = ({
  pokeDetail,
  pokeSpecies,
}: {
  pokeDetail: PokeDetailData;
  pokeSpecies: any;
}) => {
  const stats = {} as { [key: string]: number };
  pokeDetail.stats.forEach((ps) => {
    stats[ps.stat.name] = ps.base_stat;
  });

  return (
    <Tabs
      overflowY="hidden"
      sx={{
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <TabList zIndex={5}>
        <Tab fontSize={14}>About</Tab>
        <Tab fontSize={14}>Base Stats</Tab>
        <Tab fontSize={14}>Evolution</Tab>
        <Tab fontSize={14}>Moves</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <table className={styles.pokeAboutTable}>
            <tbody>
              <tr>
                <td>Species</td>
                <td style={{ textTransform: 'capitalize' }}>
                  {
                    pokeSpecies.genera.find((pg: any) => pg.language.name == 'en')
                      .genus
                  }
                </td>
              </tr>
              <tr>
                <td>Height</td>
                <td>{pokeDetail.height * 10} cm</td>
              </tr>
              <tr>
                <td>Weight</td>
                <td>{pokeDetail.weight / 10} kg</td>
              </tr>
              <tr>
                <td>Abilities</td>
                <td style={{ textTransform: 'capitalize' }}>
                  {pokeDetail.abilities.map((pa) => pa.ability.name).join(', ')}
                </td>
              </tr>
            </tbody>
          </table>

          <p className={styles.statsTabTitle}>Breeding</p>
          <table className={styles.pokeAboutTable}>
            <tbody>
              <tr>
                <td>Gender</td>
                <td>
                  {Number(pokeSpecies.gender_rate) == -1 ? (
                    'Genderless'
                  ) : (
                    <>
                      <span>
                        Male: {((8 - Number(pokeSpecies.gender_rate)) / 8) * 100}%
                        &nbsp;
                      </span>
                      <span>
                        Female: {(Number(pokeSpecies.gender_rate) / 8) * 100}%
                      </span>
                    </>
                  )}
                </td>
              </tr>
              <tr>
                <td>Egg Groups</td>
                <td style={{ textTransform: 'capitalize' }}>
                  {pokeSpecies.egg_groups.map((pe: any) => pe.name).join(', ')}
                </td>
              </tr>
            </tbody>
          </table>
        </TabPanel>
        <TabPanel>
          <table className={styles.pokeStatsTable}>
            <tbody>
              <tr>
                <td>HP</td>
                <td>{stats['hp']}</td>
                <td>
                  <PokeStatsProgress value={stats['hp']} />
                </td>
              </tr>
              <tr>
                <td>Attack</td>
                <td>{stats['attack']}</td>
                <td>
                  <PokeStatsProgress value={stats['attack']} />
                </td>
              </tr>
              <tr>
                <td>Defense</td>
                <td>{stats['defense']}</td>
                <td>
                  <PokeStatsProgress value={stats['defense']} />
                </td>
              </tr>
              <tr>
                <td>Sp. Atk</td>
                <td>{stats['special-attack']}</td>
                <td>
                  <PokeStatsProgress value={stats['special-attack']} />
                </td>
              </tr>
              <tr>
                <td>Sp. Def</td>
                <td>{stats['special-defense']}</td>
                <td>
                  <PokeStatsProgress value={stats['special-defense']} />
                </td>
              </tr>
              <tr>
                <td>Speed</td>
                <td>{stats['speed']}</td>
                <td>
                  <PokeStatsProgress value={stats['speed']} />
                </td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{Object.values(stats).reduce((a, b) => a + b, 0)}</td>
                <td>
                  <PokeStatsProgress
                    value={
                      (Object.values(stats).reduce((a, b) => a + b, 0) / 720) * 100
                    }
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <p className={styles.statsTabTitle}>Type defenses</p>
          <p>
            The effectiveness of each type on{' '}
            <span style={{ textTransform: 'capitalize' }}>{pokeDetail.name}</span>
          </p>
        </TabPanel>
        <TabPanel>Red, yellow and blue.</TabPanel>
        <TabPanel>Are 1, 2, 3</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const PokeStatsProgress = ({ value }: { value: number }) => {
  return (
    <Progress
      colorScheme={value < 50 ? 'red' : 'green'}
      value={value}
      height=".25rem"
      width="10rem"
    />
  );
};
