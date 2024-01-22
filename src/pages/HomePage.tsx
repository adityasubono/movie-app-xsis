import NowPlaying from '../components/organisms/NowPlaying';
import Popular from '../components/organisms/Popular';
import Trending from '../components//organisms/Trending';
function HomePage() {

  return (
      <div>
          {/*<PageTitle title="Home"/>*/}
          <div className="tw-mb-10 tw-flex tw-flex-col md:tw-gap-6">
              <NowPlaying/>
              <Trending/>
              <Popular/>
          </div>
      </div>
  );
}

export default HomePage;
