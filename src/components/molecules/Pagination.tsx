import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

type Props = {
  activePage: number;
  pages: number;
  setActivePage: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ activePage, pages, setActivePage }) => {
  const getPages = () => {
    const elements = [];
    const startPage = Math.max(activePage - 2, 1);
    const endPage = Math.min(activePage + 2, pages);

    for (let i = startPage; i <= endPage; i++) {
      elements.push(
        <div
          role="button"
          className={`${
            activePage === i
              ? 'tw-pointer-events-none tw-flex tw-h-8 tw-w-8 tw-select-none tw-items-center tw-justify-center tw-rounded-full tw-border-2 tw-border-yellow-500  tw-bg-gray-500 tw-bg-opacity-50 tw-px-2 tw-py-1 tw-text-center tw-text-sm tw-font-medium tw-text-white'
              : 'tw-flex tw-h-8 tw-w-8 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-bg-[#151821] tw-text-white hover:tw-bg-gray-500 hover:tw-bg-opacity-50 hover:tw-px-2 hover:tw-py-1 hover:tw-text-center hover:tw-text-sm hover:tw-font-medium hover:tw-text-white'
          }`}
          onClick={() => setActivePage(i)}
          key={i}
        >
          {i < 10 ? `0${i}` : i}
        </div>,
      );
    }
    return elements; // Note: Return array of page [1, 2, 3, 4, 5]
  };

  return (
    <div className="tw-mb-8 tw-mt-4 tw-flex tw-items-center tw-justify-center">
      <div
        // Note: Previous page (<) inactive if current page is 1
        className={`
            tw-mr-4 tw-flex tw-h-8 tw-w-8 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-bg-[#151821] tw-text-white
        ${activePage === 1 ? 'tw-cursor-not-allowed tw-opacity-50' : ''}`}
        onClick={() => activePage !== 1 && setActivePage(activePage - 1)}
      >
        <ChevronLeftIcon role="button" data-testid="pagination-previous" />
      </div>
      {getPages()}
      <div
        // Note: Next Page (>) inactive if the current page is the last page.
        className={`
            tw-ml-4 tw-flex tw-h-8 tw-w-8 tw-cursor-pointer tw-items-center tw-justify-center tw-rounded-full tw-bg-[#151821] tw-text-white
        
        ${activePage === pages ? 'tw-cursor-not-allowed tw-opacity-50' : ''}`}
        onClick={() => activePage !== pages && setActivePage(activePage + 1)}
      >
        <ChevronRightIcon role="button" data-testid="pagination-next" />
      </div>
    </div>
  );
};

export default Pagination;
