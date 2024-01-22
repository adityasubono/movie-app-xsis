import Card from '@/components/molecules/Card';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Card component', () => {
  it('renders Card component', () => {
    const data = {
      id: 1,
      title: 'Avengers',
      image: 'https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
      rating: 9.5,
    };

    render(
      <Card
        name="trending"
        type="list"
        id={data.id}
        title={data.title}
        image={data.image}
        rating={data.rating}
      />,
      {
        wrapper: MemoryRouter,
      },
    );

    expect(screen.getByText(data.title)).toBeInTheDocument();
    expect(screen.getByAltText(data.title)).toHaveAttribute('src', data.image);
    expect(screen.getByText(data.rating)).toBeInTheDocument();
  });
});
