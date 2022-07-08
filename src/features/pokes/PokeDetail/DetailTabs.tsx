import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Progress,
  Box,
  Flex,
} from '@chakra-ui/react';
import { ResponsiveRadar } from '@nivo/radar';

import { pokeIdUrlToImageUrl } from '~/helper';
import { PokeDetailData } from '../PokeType';

import styles from './style.module.css';
import PokeBall from '~/assets/pokeball.svg';

export const PokeDetailTabs = ({
  pokeDetail,
  pokeSpecies,
  pokeEvoChain,
  pokeEvo,
}: {
  pokeDetail: PokeDetailData;
  pokeSpecies: any;
  pokeEvoChain: any;
  pokeEvo: any[];
}) => {
  const stats = {} as { [key: string]: number };
  pokeDetail.stats.forEach((ps) => {
    stats[ps.stat.name] = ps.base_stat;
  });

  const statsToRadarRecord = () => {
    let record: any[] = [];
    Object.keys(stats).forEach((sk) => record.push({ name: sk, value: stats[sk] }));
    return record;
  };

  const statsTotal = () => Object.values(stats).reduce((a, b) => a + b, 0);

  const isPokeEvoEmpty = () => !pokeEvo || pokeEvo.length == 0;

  // return (
  //   <ResponsiveRadar
  //     data={data}
  //     keys={['chardonay', 'carmenere', 'syrah']}
  //     indexBy="taste"
  //     valueFormat=">-.2f"
  //     margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
  //     borderColor={{ from: 'color' }}
  //     gridLabelOffset={36}
  //     dotSize={10}
  //     dotColor={{ theme: 'background' }}
  //     dotBorderWidth={2}
  //     colors={{ scheme: 'nivo' }}
  //     blendMode="multiply"
  //     motionConfig="wobbly"
  //     legends={[
  //       {
  //         anchor: 'top-left',
  //         direction: 'column',
  //         translateX: -50,
  //         translateY: -40,
  //         itemWidth: 80,
  //         itemHeight: 20,
  //         itemTextColor: '#999',
  //         symbolSize: 12,
  //         symbolShape: 'circle',
  //         effects: [
  //           {
  //             on: 'hover',
  //             style: {
  //               itemTextColor: '#000',
  //             },
  //           },
  //         ],
  //       },
  //     ]}
  //   />
  // );

  const aboutTab = () => {
    return (
      <>
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
      </>
    );
  };

  const statsTab = () => {
    return (
      <>
        <div className={styles.statsBarRadar}>
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
                <td>{statsTotal()}</td>
                <td>
                  <PokeStatsProgress value={(statsTotal() / 720) * 100} />
                </td>
              </tr>
            </tbody>
          </table>

          <Box className={styles.baseStatsRadar} w={'100%'} h={'40vh'}>
            <ResponsiveRadar
              data={statsToRadarRecord()}
              keys={['value']}
              indexBy="name"
              valueFormat=">-.2f"
              maxValue={100}
              margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
              borderColor={{ from: 'color' }}
              gridLabelOffset={10}
              dotSize={10}
              dotColor={{ theme: 'background' }}
              dotBorderWidth={1}
              colors={{ scheme: 'nivo' }}
              blendMode="normal"
            />
          </Box>
        </div>

        {/* <p className={styles.statsTabTitle}>Type defenses</p>
            <p>
              The effectiveness of each type on{' '}
              <span style={{ textTransform: 'capitalize' }}>{pokeDetail.name}</span>
            </p> */}
      </>
    );
  };

  const pokeEvoImage = (pe: any) => {
    return (
      <Flex
        flexDirection={'column'}
        justifyContent={'center'}
        className={styles.evoContainer}
      >
        <div className={styles.evoImageContainer}>
          <PokeBall />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pokeIdUrlToImageUrl(pe.url)} alt={pe.name} />
        </div>
        <p className={styles.pokeEvoName}>{pe.name}</p>
      </Flex>
    );
  };

  const evolutionTab = () => {
    return (
      <div>
        <Box mb={3}>
          <p className={styles.evoChainTitle}>Evolution Chain</p>
        </Box>

        {pokeEvo.map((pe, idx) => {
          if (pokeEvo.length - 1 == idx) return <></>;
          return (
            <Flex
              key={idx}
              justifyContent={'space-around'}
              alignItems={'center'}
              mb={5}
            >
              {pokeEvoImage(pe)}
              <Flex
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <ArrowForwardIcon />
                <p className={styles.minLevelTitle}>
                  Level {pokeEvo[idx + 1].min_level}
                </p>
              </Flex>
              {pokeEvoImage(pokeEvo[idx + 1])}
            </Flex>
          );
        })}
      </div>
    );
  };

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
        {/* <Tab fontSize={14}>Moves</Tab> */}
      </TabList>
      <TabPanels>
        <TabPanel>{aboutTab()}</TabPanel>
        <TabPanel>{statsTab()}</TabPanel>
        <TabPanel>{isPokeEvoEmpty() ? <></> : evolutionTab()}.</TabPanel>
        {/* <TabPanel>Are 1, 2, 3</TabPanel> */}
      </TabPanels>
    </Tabs>
  );
};

const PokeStatsProgress = ({ value }: { value: number }) => {
  return (
    <Progress
      className={styles.statsProgress}
      colorScheme={value < 50 ? 'red' : 'green'}
      value={value}
      height=".25rem"
      width="10rem"
    />
  );
};
