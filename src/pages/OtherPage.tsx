import PageTitle from '../components/atoms/PageTitle';

function OtherPage() {
  return (
    <>
      <PageTitle title="Other" />
      <div className="tw-pb-32 tw-pt-12">
        <img
          src="https://media.giphy.com/media/7yojoQtevjOCI/giphy.gif"
          alt="That's all folks!"
          className="tw-mx-auto tw-w-4/5 md:tw-w-2/5"
        />
        <div className="tw-text-white-900 tw-mt-20 tw-px-4 tw-text-center tw-text-lg tw-font-extralight md:tw-text-lg">
          <div>Developed by</div>
          <a
            href="https://rayhanendra.com"
            target="_blank"
            rel="noreferrer"
            className="tw-text-white-900 tw-px-4 tw-text-center tw-text-lg tw-font-extralight md:tw-text-lg"
          >
            rayhanendra.com
          </a>
        </div>
      </div>
    </>
  );
}

export default OtherPage;
