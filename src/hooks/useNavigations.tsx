import { SearchIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const useNavigations = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigations = [

    {
      icon: <SearchIcon size={18} />,
      name: 'Series',
      link: '/series',
    },
    {
      icon: <SearchIcon size={18} />,
      name: 'Movies',
      link: '/movies',
    },
    {
      icon: <SearchIcon size={18} />,
      name: 'Genre',
      link: '/genre',
    },

  ];

  const handleClick = (link: string) => {
    navigate(link);
  };

  return { navigations, handleClick, location };
};

export default useNavigations;
