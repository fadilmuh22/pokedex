import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import api from '~/services/api';
import { PokeDetailData } from '~/features/pokes/PokeType';
import { PokeDetail } from '~/features/pokes/PokeDetail';

import styles from './PokeDetailPage.module.css';
import { ChevronLeftIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { fetchPokeDetail, fetchPokeSpecies } from '~/features/pokes/PokeApi';
import { PokeColors } from '~/features/pokes/PokeColors';

const PokeDetailPage = () => {
  const router = useRouter();
  const { name } = router.query;

  const [pokeDetail, setPokeDetail] = useState({} as PokeDetailData);
  const [pokeSpecies, setPokeSpecies] = useState({});

  const isPokeDetailEmpty = () => Object.keys(pokeDetail).length == 0;

  useEffect(() => {
    if (name) {
      fetchPokeDetail(name as string).then((res) => {
        setPokeDetail(res.data);
      });

      fetchPokeSpecies(name as string).then((res) => {
        setPokeSpecies(res.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

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
