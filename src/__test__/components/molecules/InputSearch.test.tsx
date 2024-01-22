import { render, screen, fireEvent } from '@testing-library/react';
import InputSearch from '@/components/molecules/InputSearch';

describe('InputSearch component', () => {
  it('renders input and button elements', () => {
    const setSearch = vi.fn();
    const search = 'Avengers';

    render(<InputSearch search={search} setSearch={setSearch} />);

    const inputElement = screen.getByPlaceholderText('Search');
    const buttonElement = screen.getByRole('button', { name: '' });

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls setSearch function when input value changes', () => {
    const setSearch = vi.fn();
    const search = 'Avengers';

    render(<InputSearch search={search} setSearch={setSearch} />);

    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.change(inputElement, { target: { value: 'Spider-Man' } });

    expect(setSearch).toHaveBeenCalledWith('Spider-Man');
  });
});
