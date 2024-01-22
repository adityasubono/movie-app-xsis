import React from 'react';
import Card from '../molecules/Card';
import Loader from '../atoms/Loader';

type Props = {
  data: ITrending[];
  isLoading?: boolean;
};

const CardGrid: React.FC<Props> = ({ data, isLoading }) => {
  if (isLoading) return <Loader />;

  return (
    <>
      {data.length === 0 && (
        <div className="tw-mt-10 tw-flex tw-h-full tw-items-center tw-justify-center tw-text-sm">
          There are no movies that matched your query.
        </div>
      )}
      <div className="tw-grid tw-grid-cols-2 tw-gap-4 sm:tw-grid-cols-3 lg:tw-grid-cols-4">
        {data.map((item, index) => (
          <div className="tw-flex-shrink-1 tw-flex" key={index}>
            <Card type="grid" {...item} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CardGrid;
