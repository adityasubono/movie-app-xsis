import { useQuery } from '@tanstack/react-query';
import movieService from '@/services/movie.service';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '@/components/atoms/Loader';
import { ChevronLeftIcon, StarIcon } from 'lucide-react';

const DetailPage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { isLoading, data } = useDetailQuery(movieId);
  const { handleBack } = useHandleBack();

  if (isLoading) return <Loader />;

  if (!data) return null;

  return (
    <div className="tw-mx-auto tw-max-w-2xl">
      <div className="tw-relative">
        <div className="tw-relative">
          <img
            className="tw-absolute tw-top-0 -tw-z-10 tw-w-full tw-rounded-t-3xl tw-object-cover md:tw-h-96 md:tw-object-contain"
            src={data?.image}
            loading="lazy"
          />
        </div>

        <div
          role="button"
          className="tw-absolute tw-left-4 tw-top-4 tw-rounded-full tw-bg-[#151821] tw-p-3"
          onClick={handleBack}
        >
          <ChevronLeftIcon />
        </div>
        <div className="tw-absolute tw-left-0 tw-right-0 tw-mt-96">
          <div className=" tw-bg-transparent tw-bg-gradient-to-t tw-from-[#151821] tw-to-transparent">
            <h1 className="tw-text-white-900 tw-p-4 tw-text-2xl tw-font-bold">
              {data?.title}
            </h1>
            <div className="tw-justify-centerw-px-4 tw-flex tw-items-center tw-gap-4 tw-px-4">
              <StarIcon className="tw-h-8 tw-w-8 tw-fill-current tw-text-yellow-500" />
              <div className="tw-text-white-500 tw-text-sm tw-font-bold">
                {Math.round(data?.rating * 10) / 10}
              </div>
            </div>
          </div>
          <div className="tw-h-screen tw-bg-[#151821] tw-p-4 tw-pb-32 md:tw-h-full md:tw-pb-14">
            {data?.overview}
          </div>
        </div>
      </div>
    </div>
  );
};

const useHandleBack = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return {
    handleBack,
  };
};

const useDetailQuery = (movieId: string | undefined) =>
  useQuery({
    queryKey: ['detail', movieId],
    queryFn: async () => {
      return await movieService.getDetail(movieId);
    },
    select: (data) => {
      const { title, overview, poster_path, release_date, vote_average } =
        data.data;

      const newData: IMovieDetail = {
        title,
        overview,
        image: `https://www.themoviedb.org/t/p/w1280${poster_path}`,
        releaseDate: release_date,
        rating: vote_average,
      };

      return newData;
    },
  });

export default DetailPage;
