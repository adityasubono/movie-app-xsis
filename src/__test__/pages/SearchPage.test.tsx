import { render, renderHook, waitFor } from '@testing-library/react';
import SearchPage, { useSearch } from '@/pages/SearchPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
);

export default wrapper;

describe('SearchPage component', () => {
  test('renders SearchPage component', () => {
    const { getByText, getByPlaceholderText } = render(<SearchPage />, {
      wrapper,
    });

    const pageTitle = getByText('Search Movies');
    expect(pageTitle).toBeInTheDocument();

    const inputSearch = getByPlaceholderText('Search');
    expect(inputSearch).toBeInTheDocument();
  });

  test('useSearch hook returns data', async () => {
    const { result } = renderHook(() => useSearch('Avengers', 1), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toBeDefined();
    });
  });
});
