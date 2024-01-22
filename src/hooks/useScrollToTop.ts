import { useEffect } from 'react';

const useScrollToTop = (trigger: number | string) => {
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [trigger]);
};

export default useScrollToTop;
