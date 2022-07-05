import { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

import { HamburgerIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import styles from './IndexPage.module.css';

import PokeBall from '../assets/pokeball.svg';
import { PokesGrid } from '~/features/pokes/PokesGrid';

const IndexPage: NextPage = () => {
  return (
    <div className={styles.indexPage}>
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

      <PokesGrid />
    </div>
  );
};

export default IndexPage;
