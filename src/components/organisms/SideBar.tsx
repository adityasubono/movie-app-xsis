import useNavigations from '@/hooks/useNavigations';
import React from 'react';

const SideBar: React.FC = () => {
  const { navigations, location, handleClick } = useNavigations();

  return (
    <div className=" tw-sticky tw-top-0 tw-z-50 tw-flex tw-h-screen tw-w-full tw-p-4">
      <div className="tw-backgdrop-filter tw-flex tw-flex-col tw-items-center tw-justify-evenly tw-gap-16 tw-rounded-3xl tw-bg-slate-600 tw-bg-opacity-5 tw-p-6 tw-py-20 tw-backdrop-blur-lg">
        {navigations.map((navigation) => {
          const isSelected = location.pathname === navigation.link;
          const filledIcon = React.cloneElement(navigation.icon, {
            fill: isSelected ? '#fcd660' : 'none',
          });

          return (
            <div
              key={navigation.name}
              className={`tw-flex tw-flex-col tw-items-center tw-gap-4 lg:tw-flex-row ${
                isSelected ? 'tw-text-yellow-500' : ''
              } tw-cursor-pointer`}
              onClick={() => handleClick(navigation.link)}
            >
              <div>{filledIcon}</div>
              <div className="tw-text-white-500 tw-text-center tw-text-base tw-font-medium">
                {navigation.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
