import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { Flex } from '@chakra-ui/react';
import { ChevronLeftIcon, HamburgerIcon } from '@chakra-ui/icons';

import { fetchEvolutionChain, fetchPokeSpecies } from '~/api';
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
  const [pokeSpecies, setPokeSpecies] = useState({} as any);
  const [pokeEvoChain, setPokeEvoChain] = useState({} as any);

  const [pokeEvo, setPokeEvo] = useState([] as any[]);

  useEffect(() => {
    if (name) {
      dispatch(fetchPokeDetailAsync(name as string));

      fetchPokeSpecies(name as string).then((res) => {
        setPokeSpecies(res.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    if (!!pokeSpecies && Object.keys(pokeSpecies).length != 0) {
      let evoChainId = pokeSpecies.evolution_chain.url.split('/')[6];
      fetchEvolutionChain(evoChainId).then((res) => {
        setPokeEvoChain(res.data);
      });
    }
  }, [pokeSpecies]);

  useEffect(() => {
    if (Object.keys(pokeEvoChain).length != 0) {
      let evoChain: any[] = [];
      // const evoDetail =
      //   pokeEvoChain.chain.evolution_details.length == 0
      //     ? null
      //     : pokeEvoChain.chain.evolution_details[0];
      // evoChain = [...pokeEvo, { ...pokeEvoChain.chain.species, ...evoDetail }];

      let chain = pokeEvoChain.chain;
      do {
        evoChain = [
          ...evoChain,
          { ...chain.species, ...chain.evolution_details[0] },
        ];
        chain = chain.evolves_to[0];
      } while (
        (chain && !!chain.species.name) ||
        (chain && chain.evolves_to[0] != 0)
      );

      setPokeEvo(evoChain);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokeEvoChain]);

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
        pokeEvoChain={pokeEvoChain}
        pokeEvo={pokeEvo}
      />
    </div>
  );
};

export default PokeDetailPage;
