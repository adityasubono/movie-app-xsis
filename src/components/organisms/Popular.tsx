import CardList from './CardList';
import { useQuery } from '@tanstack/react-query';
import movieService from '@/services/movie.service';
import Loader from '@/components/atoms/Loader';

const Popular = () => {
  const { isLoading, data } = usePopularQuery();

  if (isLoading)
    return (
      <div data-testid="popular-loading">
        <Loader />
      </div>
    );

  return (
    <div className="tw-px-4">
      <div className="tw-text-white-900 tw-py-4 tw-text-base tw-font-bold md:tw-text-lg">
        Popular
      </div>
      <div>
        <CardList name="popular" data={data} />
      </div>
    </div>
  );
};

export const usePopularQuery = () =>
  useQuery({
    queryKey: ['popular'],
    queryFn: movieService.getPopular,
    select(data) {
      const items = data.data.results.map((item: IApiMovieItem) => ({
        id: item.id,
        title: item.title,
        image: `https://www.themoviedb.org/t/p/w1280${item.backdrop_path}`,
        rating: item.vote_average,
      }));

      return items;
    },
    keepPreviousData: true,
  });

export default Popular;
