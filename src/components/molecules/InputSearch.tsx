import React from 'react';
import { SearchIcon } from 'lucide-react';

type Props = {
  search: string;
  btnHidden: boolean;
  setSearch: (search: string) => void;
};

const InputSearch: React.FC<Props> = ({ search, setSearch, btnHidden }) => {
  return (
    <div className="tw-flex tw-items-center tw-justify-center">
      <input
        className="tw-w-full tw-rounded-md tw-px-4 tw-py-2 tw-leading-tight focus:tw-border-transparent focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-500"
        type="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
        <div className={`${btnHidden ? 'tw-hidden' : ''} tw-cursor-pointer`}>
            <button
                className="tw-ml-2 tw-rounded-md tw-bg-yellow-500 tw-p-2 tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-yellow-500"
                type="submit"
            >
                <SearchIcon size={18}/>
            </button>
        </div>

    </div>
  );
};

export default InputSearch;
