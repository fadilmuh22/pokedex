import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { HamburgerIcon } from '@chakra-ui/icons';
import { Flex, Grid } from '@chakra-ui/react';

import { PokePagination } from '../types/Poke';

import Card from '../components/Card';
import api from '../services/api';

import styles from '../styles/Home.module.css';

import PokeBall from '../assets/pokeball.svg';

const Home: NextPage = () => {
  let [paginationOffset, setPaginationOffset] = useState(12);
  const [pokeList, setPokeList] = useState([] as PokePagination[]);

  useEffect(() => {
    api.get(`/pokemon?limit=${paginationOffset}`).then((res) => {
      setPokeList(res.data.results);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.homePage}>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex Software Seni" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PokeBall className={styles.pokeball} />

      <Flex zIndex={3} alignItems={'center'} justifyContent={'space-between'}>
        <div></div>
        <HamburgerIcon strokeWidth={10} w={6} h={6} />
      </Flex>

      <p className={styles.titlePage}>Pokedex</p>

      <>
        {pokeList.length == 0 ? (
          <div></div>
        ) : (
          <Grid
            className={styles.pokesGrid}
            templateColumns="repeat(2, 1fr)"
            gap={2}
          >
            {pokeList.map((poke, idx) => (
              <Card key={idx} name={poke.name} url={poke.url} />
            ))}
          </Grid>
        )}
      </>
    </div>
  );
};

export default Home;
