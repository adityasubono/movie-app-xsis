import { render, screen } from '@testing-library/react';
import CardGrid from '@/components/organisms/CardGrid';

describe('CardGrid component', () => {
  it('renders Card components', () => {
    const data = [
      {
        id: 1,
        title: 'Avengers',
        image: 'https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
        rating: 9.5,
      },
      {
        id: 2,
        title: 'Spider-Man',
        image: 'https://image.tmdb.org/t/p/w500/SpiderMan.jpg',
        rating: 8.7,
      },
    ];

    render(<CardGrid data={data} />);

    data.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByAltText(item.title)).toHaveAttribute(
        'src',
        item.image,
      );
      expect(screen.getByText(item.rating.toString())).toBeInTheDocument();
    });
  });

  it('renders Loader component when isLoading is true', () => {
    render(<CardGrid data={[]} isLoading={true} />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders "no movies" message when data is empty', () => {
    render(<CardGrid data={[]} isLoading={false} />);

    expect(
      screen.getByText('There are no movies that matched your query.'),
    ).toBeInTheDocument();
  });
});
