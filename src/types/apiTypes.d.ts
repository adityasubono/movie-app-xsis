interface IApiMovieItem {
  id: string;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
}

interface IApiVideo {
  id: string;
  name: string;
  type: string;
  site: string;
  key: string;
}
