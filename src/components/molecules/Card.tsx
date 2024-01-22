import React, {Fragment, useRef, useState} from 'react';
import {StarIcon} from 'lucide-react';
import {Dialog, Transition} from "@headlessui/react";
import {useQuery} from "@tanstack/react-query";
import movieService from "@/services/movie.service.ts";

type Props = {
  name?: string;
  type?: 'list' | 'grid';
  id: number;
  title: string;
  image: string;
  rating: number;
};


const Card: React.FC<Props> = ({
  name,
  type = 'list',
  id,
  title,
  image,
  rating,
}) => {
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const {data } = useVideosQuery(id);


  const handleClick = () => {
    setOpen(true)
  };

  return (
    <div
      className={`${
        type === 'list'
          ? 'tw-w-32 md:tw-w-40'
          : type === 'grid'
          ? 'tw-w-full'
          : ''
      } tw-relative tw-h-32 tw-flex-shrink-0 tw-cursor-pointer tw-rounded-xl md:tw-h-64`}
      onClick={handleClick}
    >
      <img
        className="tw-absolute -tw-z-10 tw-h-full tw-w-full tw-rounded-xl tw-object-cover"
        src={image}
        alt={title}
        loading="lazy"
      />



      <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-z-10 tw-rounded-b-xl tw-bg-slate-300 tw-bg-opacity-5 tw-p-2 tw-backdrop-blur-md tw-backdrop-filter">
        <div
          data-testid={`${name}-title`}
          className="tw-truncate tw-text-sm tw-font-bold md:tw-text-lg"
        >
          {title}
        </div>
        <div className="tw-flex tw-items-center tw-gap-1">
          <StarIcon className="tw-h-3 tw-w-3 tw-fill-current tw-text-yellow-500" />
          <div className="tw-text-white-500 tw-text-xs">
            {Math.round(rating * 10) / 10}
          </div>
        </div>
      </div>




      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="tw-relative  tw-z-30" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
              as={Fragment}
              enter="tw-ease-out tw-duration-300"
              enterFrom="tw-opacity-0"
              enterTo="tw-opacity-100"
              leave="tw-ease-in tw-duration-200"
              leaveFrom="tw-opacity-100"
              leaveTo="tw-opacity-0"
          >
            <div className="tw-fixed tw-inset-0 tw-bg-gray-500 tw-bg-opacity-75 tw-transition-opacity" />
          </Transition.Child>

          <div className="tw-fixed tw-inset-0 tw-z-10 tw-w-screen tw-overflow-y-auto">
            <div className="tw-flex tw-min-h-full tw-items-end tw-justify-center tw-p-4 tw-text-center sm:tw-items-center sm:tw-p-0">
              <Transition.Child
                  as={Fragment}
                  enter="tw-ease-out tw-duration-300"
                  enterFrom="tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95"
                  enterTo="tw-opacity-100 tw-translate-y-0 sm:tw-scale-100"
                  leave="tw-ease-in tw-duration-200"
                  leaveFrom="tw-opacity-100 tw-translate-y-0 sm:tw-scale-100"
                  leaveTo="tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95"
              >
                <Dialog.Panel className="tw-relative tw-transform tw-overflow-hidden tw-rounded-lg tw-bg-white tw-text-left tw-shadow-xl tw-transition-all sm:tw-my-8 sm:tw-w-full sm:tw-max-w-lg">
                  <div className="tw-bg-white tw-px-4 tw-pb-4 tw-pt-5 sm:tw-p-6 sm:tw-pb-4">
                    <div className="sm:tw-flex sm:tw-items-start">
                      <div className="tw-mt-3 tw-text-center sm:tw-ml-4 sm:tw-mt-0 sm:tw-text-left">



                        <Dialog.Description>
                          <iframe className=" tw-w-full tw-aspect-video"
                                  src={`https://www.youtube.com/embed/${data?.key}`}>
                          </iframe>

                        </Dialog.Description>

                        <Dialog.Title as="h3"
                                      className="tw-mt-5 tw-text-base tw-font-semibold tw-leading-6 tw-text-gray-900">
                          {title}
                        </Dialog.Title>
                        <div className="mt-2">

                          <p className="tw-text-sm tw-text-gray-500">
                            Are you sure you want to deactivate your account? All of your data will be permanently
                            removed. This action cannot be undone.
                          </p>
                          <div className="tw-flex tw-items-center tw-gap-1 tw-mt-5">
                            <StarIcon className="tw-h-3 tw-w-3 tw-fill-current tw-text-yellow-500"/>
                            <div className="tw-text-black tw-text-xs">
                              {Math.round(rating * 10) / 10}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tw-bg-gray-50 tw-px-4 tw-py-3 sm:tw-flex sm:tw-flex-row-reverse sm:tw-px-6">
                    <button
                        type="button"
                        className="tw-mt-3 tw-inline-flex tw-w-full tw-justify-center tw-rounded-md tw-bg-white tw-px-3 tw-py-2 tw-text-sm tw-font-semibold tw-text-gray-900 tw-shadow-sm tw-ring-1 tw-ring-inset tw-ring-gray-300 hover:tw-bg-gray-50 sm:tw-mt-0 sm:tw-w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>



    </div>
  );
};

export default Card;

const useVideosQuery = (id: number) => useQuery({
      queryKey: ['videos', id],
      queryFn: () => movieService.getVideos(id),
      select(data) {
        const result = data.data.results.filter(
            (item: IApiVideo) => (item.type === 'Trailer' && item.name === 'Official Trailer') || item.name === 'Official Trailer');
        const item = result[0];
        return {
          id: item?.id,
          key: item?.key,
          name: item?.name,
          site: item?.site,
          type: item?.type,
        };
      },
      keepPreviousData: true,
    });



