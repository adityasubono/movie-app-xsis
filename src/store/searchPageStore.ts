import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SearchPageStore = {
  search: string;
  activePage: number;
  setSearch: (search: string) => void;
  setActivePage: (page: number) => void;
};

const useSearchPageStore = create<SearchPageStore>()(
  persist(
    (set) => ({
      search: '',
      activePage: 1,
      setSearch: (search) => set(() => ({ search: search })),
      setActivePage: (page) => set(() => ({ activePage: page })),
    }),
    {
      name: 'search-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useSearchPageStore;
