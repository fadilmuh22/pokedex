import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { Flex } from '@chakra-ui/react';
import { ChevronLeftIcon, HamburgerIcon } from '@chakra-ui/icons';

import { fetchPokeSpecies } from '~/api';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { PokeDetail } from '~/features/pokes/PokeDetail';
import { fetchPokeDetailAsync, selectPokeDetail } from '~/features/pokes/PokeSlice';
import { PokeColors } from '~/features/pokes/PokeColors';

import styles from './style.module.css';

const PokeDetailPage = () => {
  const router = useRouter();
  const { name } = router.query;

  const dispatch = useAppDispatch();

  const pokeDetail = useAppSelector(selectPokeDetail)[name as string];
  const [pokeSpecies, setPokeSpecies] = useState({});

  useEffect(() => {
    if (name) {
      dispatch(fetchPokeDetailAsync(name as string));

      fetchPokeSpecies(name as string).then((res) => {
        setPokeSpecies(res.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const isPokeDetailEmpty = () => !pokeDetail || Object.keys(pokeDetail).length == 0;

  return (
    <div
      className={styles.pokeDetailPage}
      style={{
        padding: '30px 20px 0 20px',
        backgroundColor: isPokeDetailEmpty()
          ? 'white'
          : PokeColors.colors.type[pokeDetail.types[0].type.name],
      }}
    >
      <Flex
        marginBottom={3}
        zIndex={3}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <ChevronLeftIcon
          onClick={() => router.back()}
          color="white"
          strokeWidth={10}
          w={6}
          h={6}
        />
        <HamburgerIcon color="white" strokeWidth={10} w={6} h={6} />
      </Flex>

      <PokeDetail
        name={name as string}
        pokeDetail={pokeDetail}
        pokeSpecies={pokeSpecies}
      />
    </div>
  );
};

export default PokeDetailPage;
