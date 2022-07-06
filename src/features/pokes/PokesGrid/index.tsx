import { useRef, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Grid, Flex } from '@chakra-ui/react';

import { useAppDispatch, useAppSelector, useOnScreen } from '~/app/hooks';
import { PokeCard } from '../PokeCard';
import {
  fetchPokeListAsync,
  nextPage,
  selectPaginationOffset,
  selectPokeList,
  selectPokeStateStatus,
} from '../PokeSlice';

import styles from './style.module.css';

export const PokesGrid = () => {
  const loadingRef = useRef(null);
  const dispatch = useAppDispatch();

  const pokeList = useAppSelector(selectPokeList);
  const paginationOffset = useAppSelector(selectPaginationOffset);
  const pokeStateStatus = useSelector(selectPokeStateStatus);

  const isLoadingOnScreen = useOnScreen(loadingRef);

  useEffect(() => {
    if (isLoadingOnScreen) dispatch(nextPage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingOnScreen]);

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
