import { useState } from 'react';

const useDebounce = (): ((func: () => void, wait: number) => void) => {
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const debounce = (func: () => void, wait: number): void => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(func, wait);
    setDebounceTimeout(timeout);
  };

  return debounce;
};

export default useDebounce;
