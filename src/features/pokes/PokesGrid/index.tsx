import { Grid, Flex } from '@chakra-ui/react';
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '~/app/hooks';

import { PokeCard } from '../PokeCard';

import {
  fetchPokeListAsync,
  nextPage,
  selectPaginationOffset,
  selectPokeList,
  selectPokeStateStatus,
} from '../PokeSlice';

import styles from './PokesGrid.module.css';

export const PokesGrid = () => {
  const loadingRef = useRef(null);
  const dispatch = useAppDispatch();

  const pokeList = useAppSelector(selectPokeList);
  const paginationOffset = useAppSelector(selectPaginationOffset);
  const pokeStateStatus = useSelector(selectPokeStateStatus);

  const handleObserver = (
    entries: IntersectionObserverEntry[],
    observe: IntersectionObserver,
  ): void => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      dispatch(nextPage());
    }
  };

  useEffect(() => {
    console.log(loadingRef);
    const options = {
      root: document.querySelector('#pokesGridArea'),
      rootMargin: '0px',
      threshold: 1.0,
    };

    let observer = new IntersectionObserver(handleObserver, options);
    if (loadingRef.current) observer.observe(loadingRef.current);

    return () => {
      if (loadingRef.current) observer.unobserve(loadingRef.current);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchPokeListAsync(paginationOffset));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationOffset]);

  return (
    <div id={styles.pokesGridArea}>
      {pokeList.length == 0 ? (
        <div></div>
      ) : (
        <Grid className={styles.pokesGrid} templateColumns="repeat(2, 1fr)" gap={2}>
          {pokeList.map((poke, idx) => (
            <PokeCard key={idx} name={poke.name} url={poke.url} />
          ))}
        </Grid>
      )}

      <Flex
        ref={loadingRef}
        w={'100%'}
        h={'fit-content'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        {pokeStateStatus == 'loading' ? 'Fetching...' : `${paginationOffset / 12}`}
      </Flex>
    </div>
  );
};
