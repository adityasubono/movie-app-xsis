import { useDebounce } from '@/hooks/useDebounce';
import { useEffect } from 'react';
import InputSearch from '@/components/molecules/InputSearch';
import movieService from '@/services/movie.service';
import { useQuery } from '@tanstack/react-query';
import Pagination from '@/components/molecules/Pagination';
import CardGrid from '@/components/organisms/CardGrid';
import PageTitle from '@/components/atoms/PageTitle';
import useScrollToTop from '@/hooks/useScrollToTop';
import { useSearchParams } from 'react-router-dom';
import useSearchPageStore from '@/store/searchPageStore';

function SearchPage() {
  const [, setSearchParams] = useSearchParams();

  // Note: Store
  const { search: searchStore, activePage: activePageStore } =
    useSearchPageStore((state) => state);
  const setSearchStore = useSearchPageStore((state) => state.setSearch);
  const setActivePageStore = useSearchPageStore((state) => state.setActivePage);

  // Note: Debounce
  const debouncedSearch = useDebounce(searchStore, 500);

  // Note: Query
  const { data, isLoading } = useSearch(debouncedSearch, activePageStore);
  const pagination = usePagination(debouncedSearch, activePageStore);

  // Note: Custom Hooks
  useSearchPageEffect({
    searchStore,
    activePageStore,
    setSearchStore,
    setActivePageStore,
    debouncedSearch,
  });

  return (
    <>
      <PageTitle title="Search Movies" />
      <div className="tw-sticky tw-top-0 tw-z-50  tw-bg-[#151821] tw-p-4">
        <InputSearch
            search={searchStore}
            setSearch={(search: string) => {
                setSearchParams({query: search, page: '1'});
                setSearchStore(search);
            }}
            btnHidden={false}
        />
      </div>
      <div className="md:tw-px-4">
        <div className="tw-bg-yellow-400 tw-px-4 tw-text-xs tw-text-[#151821]">
          Search Results
        </div>
      </div>
      <div className="tw-p-4">
        <CardGrid data={data} isLoading={isLoading} />
      </div>
      <div className="tw-pb-28">
        <Pagination
          activePage={activePageStore}
          setActivePage={setActivePageStore}
          pages={pagination.data?.total_pages || 1}
        />
      </div>
    </>
  );
}

export default SearchPage;

// Note: This is a custom hook to implement select partial subscriptions
const useSearchQuery = (
  { search, page }: { search: string; page: number },
  select: (data: any) => any,
) =>
  useQuery({
    queryKey: ['search', search, page],
    queryFn: async () => {
      return await movieService.getSearch(search, page);
    },
    select,
  });

export const useSearch = (search: string, page: number) =>
  useSearchQuery({ search, page }, (data) => {
    const items = data.data.results.map((item: IApiMovieItem) => ({
      id: item.id,
      title: item.title,
      image: `https://www.themoviedb.org/t/p/w1280${item.backdrop_path}`,
      rating: item.vote_average,
    }));

    return items;
  });

const usePagination = (search: string, page: number) =>
  useSearchQuery({ search, page }, (data) => {
    const { page, total_pages, total_results } = data?.data || {};
    return {
      page: page || 1,
      total_pages: total_pages || 1,
      total_results: total_results || 0,
    };
  });

const useSearchPageEffect = ({
  searchStore,
  activePageStore,
  setSearchStore,
  setActivePageStore,
  debouncedSearch,
}: {
  searchStore: string;
  activePageStore: number;
  setSearchStore: (search: string) => void;
  setActivePageStore: (page: number) => void;
  debouncedSearch: string;
}) => {
  const [, setSearchParams] = useSearchParams();

  // Note: Scroll to top when page change
  useScrollToTop(activePageStore);

  // Note: Set search params when search
  useEffect(() => {
    if (activePageStore) {
      setSearchParams({
        query: debouncedSearch,
        page: activePageStore.toString(),
      });
      setSearchStore(debouncedSearch);
      setActivePageStore(activePageStore);
    }
  }, [activePageStore]);

  // Note: Reset page when search
  useEffect(() => {
    if (!searchStore) {
      setSearchParams('', { replace: true });
      setSearchStore('');
      setActivePageStore(1);
    }
  }, [searchStore, activePageStore]);

  // Note: Reset search and page when unmount
  // useEffect(() => {
  //   return () => {
  //     setSearchStore('');
  //     setActivePageStore(1);
  //   };
  // }, []);
};
