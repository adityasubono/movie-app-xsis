import React, { useRef, useEffect } from 'react';
import { PlayIcon, StarIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import movieService from '@/services/movie.service';

type Props = {
  section?: string;
  type?: 'list' | 'grid';
  id: string;
  overview: string;
  title: string;
  image: string;
  rating: number;
};

const CardTrailer: React.FC<Props> = ({
  section,
  type = 'list',
  id,
  title,
  image,
  overview,
  rating,
}) => {

  const { isLoading, data } = useVideosQuery(id);
  const { handleClick, modalRef } = useModal(data);

  if (isLoading)
    return (
      <div
        className={`${
          type === 'list'
            ? 'tw-w-60 md:tw-w-4/6'
            : type === 'grid'
            ? 'tw-w-full'
            : ''
        } tw-relative tw-h-40 tw-flex-shrink-0 tw-animate-pulse tw-rounded-xl tw-bg-gray-800 tw-bg-opacity-50 md:tw-h-96`}
      ></div>
    );

  return (
      <div
          className={`${type === 'list' ? 'tw-w-60 md:tw-w-4/6' : type === 'grid' ? 'tw-w-full' : ''} tw-relative tw-h-40 tw-flex-shrink-0 tw-cursor-pointer tw-rounded-xl md:tw-h-96`}
          onClick={handleClick}
      >
        <img
            className="tw-absolute tw-h-full tw-w-full tw-rounded-xl tw-object-cover"
            src={image}
            alt={title}
            loading="lazy"
        />

        <div className="tw-flex tw-justify-end">
          <div
              className=" tw-my-8 tw-w-4/12  tw-rounded-lg tw-bg-slate-300 tw-bg-opacity-5 tw-p-2 tw-backdrop-blur-md tw-backdrop-filter">
            <div
                data-testid={`${section}-title`}
                className="tw-truncate tw-text-sm tw-font-bold md:tw-text-lg"
            >
              {title}
            </div>
            <div className="tw-flex tw-items-center tw-gap-1">
              <div className="tw-text-white tw-text-xs">
                {overview}
              </div>
            </div>
            <div className="tw-mt-3 tw-flex tw-items-center tw-gap-1">
              <StarIcon className="tw-h-3 tw-w-3 tw-fill-current tw-text-yellow-500"/>
              <div className="tw-text-white-500 tw-text-xs">
                {Math.round(rating * 10) / 10}
              </div>
            </div>
          </div>
          <div className="tw-absolute tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center">
            <PlayIcon className=" tw-h-10 tw-w-10 tw-fill-current tw-text-white"/>
          </div>

          <div ref={modalRef}
               className="tw-absolute tw-left-0 tw-top-0 tw-z-40 tw-h-full tw-w-full tw-rounded-xl tw-bg-black tw-bg-opacity-0 hover:tw-bg-opacity-25">
          </div>
        </div>
      </div>
  );
};

export default CardTrailer;

const useModal = (data: IVideo | undefined) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const showModal = (key: string) => {
    const modal = modalRef.current;
    if (modal) {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', `https://www.youtube.com/embed/${key}`);
      iframe.setAttribute('allowfullscreen', 'true');
      iframe.setAttribute('width', '100%');
      iframe.setAttribute('height', '100%');
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('allow', 'autoplay; encrypted-media');
      modal.appendChild(iframe);
      modal.classList.remove('tw-hidden');
    }
  };

  const hideModal = () => {
    const modal = modalRef.current;
    if (modal) {
      modal.classList.add('tw-hidden');
      modal.innerHTML = '';
    }
  };

  const clickOutside = (e: React.MouseEvent<HTMLElement>) => {
    const modal = modalRef.current;
    if (modal && !modal.contains(e.target as Node)) {
      hideModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside as any);
    return () => {
      document.removeEventListener('mousedown', clickOutside as any);
    };
  }, []);

  const handleClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (data && isMobile) {
      window.open(`https://www.youtube.com/watch?v=${data.key}`, '_blank');
    } else if (data && !isMobile) {
      showModal(data.key);
    }
  };

  return {
    handleClick,
    modalRef,
  };
};

const useVideosQuery = (id: string) =>
  useQuery({
    queryKey: ['videos', id],
    queryFn: () => movieService.getVideos(id),
    select(data) {
      const result = data.data.results.filter(
        (item: IApiVideo) =>
          (item.type === 'Trailer' && item.name === 'Official Trailer') ||
          item.name === 'Official Trailer',
      );
      const item = result[0];
      const movie = {
        id: item?.id,
        key: item?.key,
        name: item?.name,
        site: item?.site,
        type: item?.type,
      };

      return movie;
    },
    keepPreviousData: true,
  });
