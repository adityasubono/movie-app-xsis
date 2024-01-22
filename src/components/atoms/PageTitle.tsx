import { HomeIcon, SearchIcon } from 'lucide-react';

type Props = {
  title: 'Home' | 'Search Movies' | 'Movies Page' | 'Genre Page' | 'Series Page';
};

const PageTitle: React.FC<Props> = ({ title }: Props) => {
  const pages = [
    {
      title: 'Home',
      icon: <HomeIcon data-testid="home-icon" />,
    },
    {
      title: 'Series',
      icon: <HomeIcon data-testid="home-icon" />,
    },
    {
      title: 'Movie',
      icon: <HomeIcon data-testid="home-icon" />,
    },
    {
      title: 'Search',
      icon: <SearchIcon data-testid="search-icon" />,
    },
    {
      title: 'Genre',
      icon: <SearchIcon data-testid="search-icon" />,
    },
  ];

  return (
    <div className="tw-backgdrop-filter tw-flex tw-items-center tw-gap-4 tw-rounded-b-3xl tw-bg-slate-600 tw-bg-opacity-5 tw-p-6 tw-backdrop-blur-lg">
      <div className="tw-text-white-900 tw-text-lg tw-font-bold md:tw-text-3xl">
        {title}
      </div>
      {pages.find((page) => page.title === title)?.icon}
    </div>
  );
};

export default PageTitle;
