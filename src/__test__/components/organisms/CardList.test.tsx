// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { render, screen } from '@testing-library/react';
import CardList from '@/components/organisms/CardList';
import { MemoryRouter } from 'react-router-dom';

describe('CardList component', () => {
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

    render(<CardList name="trending" data={data} />, {
      wrapper: MemoryRouter,
    });

    data.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByAltText(item.title)).toHaveAttribute(
        'src',
        item.image,
      );
      expect(screen.getByText(item.rating.toString())).toBeInTheDocument();
    });
  });

  it('renders null when data is not provided', () => {
    render(<CardList name="trending" data={null} />, {
      wrapper: MemoryRouter,
    });

    expect(screen.queryByTestId('trendings-wrapper')).not.toBeInTheDocument();
  });
});
