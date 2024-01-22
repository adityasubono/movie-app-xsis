import React from 'react';
import Card from '../molecules/Card';

type Props = {
  name: string;
  data: ITrending[];
};

const CardList: React.FC<Props> = ({ name, data }) => {
  if (!data) return null;

  return (
    <div
      data-testid={`${name}s-wrapper`}
      className="base-scrollbar tw-flex tw-items-center tw-space-x-4 tw-overflow-x-auto tw-pb-4"
    >
      {data.map((item, index) => (
        <Card name={name} key={index} {...item}/>
      ))}
    </div>
  );
};

export default CardList;
