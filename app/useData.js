import { useState, useEffect } from 'react';
import { MD5 } from 'react-native-crypto-js';

import { privateKey, publicKey } from './config.json';

const ts = new Date().getTime();
const hash = MD5(`${ts}${privateKey}${publicKey}`);

const useData = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  const loadData = async (offset = 0, memo = []) => {
    const response = await fetch(
      `${url}?apikey=${publicKey}&ts=${ts}&hash=${hash}&limit=100&offset=${offset}`,
    );

    if (response.status === 429) {
      throw new Error(
        'Error: New and existing users are default to a rate limit of 3000 calls per day.',
      );
    }

    const {
      data: { results, count, total },
    } = await response.json();

    const acc = [...memo, ...results];
    setData(acc);

    return offset < total ? loadData(offset + count, acc) : acc;
  };

  useEffect(() => {
    const load = async () => {
      try {
        await loadData();
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
};

export default useData;
