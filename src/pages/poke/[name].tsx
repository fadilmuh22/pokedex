import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import api from '~/services/api';
import { PokeDetail } from '~/types/Poke';

export const PokeDetailPage = () => {
  const router = useRouter();
  const { name } = router.query;

  const [pokeDetail, setPokeDetail] = useState({} as PokeDetail);

  useEffect(() => {
    if (name) {
      api.get(`/pokemon/${name}`).then((res) => {
        setPokeDetail(res.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return <div></div>;
};
