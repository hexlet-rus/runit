import { useEffect, useRef } from 'react';

function useDebounce(callback, timeout = 1000, deps = []) {
  const data = useRef({ clearFunc: null });

  useEffect(() => {
    const { clearFunc } = data.current;

    const handler = setTimeout(() => {
      if (clearFunc && typeof clearFunc === 'function') {
        clearFunc();
      }
      data.current.clearFunc = callback();
    }, timeout);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeout, ...deps]);
}

export default useDebounce;
