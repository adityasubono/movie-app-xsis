import CardList from './CardList';
import { useQuery } from '@tanstack/react-query';
import movieService from '@/services/movie.service';
import Loader from '@/components/atoms/Loader';
import {useState} from 'react';


const Trending = () => {
    const { selector, setSelector, selects } = useSelector();
    const { isLoading, data } = useTrendingQuery(selector);


  if (isLoading)
    return (
      <div data-testid="trending-loading">
        <Loader />
      </div>
    );

  return (
    <div className="tw-px-4">
      <div className="tw-flex tw-items-center tw-justify-between md:tw-justify-normal md:tw-gap-10">
        <div className="tw-text-white-900 tw-py-4 tw-text-base tw-font-bold md:tw-text-lg">
          Trending
        </div>
        <div className="tw-flex tw-space-x-4 tw-rounded-full tw-border tw-border-solid tw-border-slate-500 tw-px-1 tw-py-1">
          {selects.map((item, index) => (
            <div
              key={index}
              className={`md:tw-text-md tw-flex tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-px-4 tw-py-1 tw-text-base  tw-font-semibold ${
                selector === item &&
                'tw-cursor-default tw-bg-gradient-to-r tw-from-yellow-400 tw-to-yellow-600'
              }`}
              onClick={() => setSelector(item)}
            >
              <span
                className={`tw-bg-white tw-bg-clip-text tw-text-sm tw-text-transparent ${
                  selector === item &&
                  'tw-bg-blue-500 tw-bg-gradient-to-r tw-from-yellow-600 tw-to-yellow-800'
                }`}
              >
                {item === 'day' ? 'Today' : 'This Week'}
              </span>
            </div>
          ))}
        </div>
      </div>
      <CardList name="trending" data={data}/>
    </div>
  );
};

const useSelector = () => {
  const [selector, setSelector] = useState<string>('day');
  const selects = ['day', 'week'];

  return { selector, setSelector, selects };
};

export const useTrendingQuery = (selector: string) =>
  useQuery({
    queryKey: ['trending', selector],
    queryFn: async () => await movieService.getTrending(selector),
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





export default Trending;


