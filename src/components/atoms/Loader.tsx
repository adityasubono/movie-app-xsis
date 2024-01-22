import { Loader2Icon } from 'lucide-react';

const Loader = () => {
  return (
    <div
      className="tw-mt-20 tw-flex tw-h-full tw-items-center tw-justify-center"
      data-testid="loader-container"
    >
      <Loader2Icon
        className="tw-h-8 tw-w-8 tw-animate-spin"
        data-testid="loader-icon"
      />
    </div>
  );
};

export default Loader;
