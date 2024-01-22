import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Trending, { useTrendingQuery } from '@/components/organisms/Trending';
import { render, screen, renderHook, waitFor } from '@testing-library/react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default wrapper;

describe('Trending component', () => {
  it('displays loading state', () => {
    render(<Trending />, { wrapper });
    expect(screen.getByTestId('trending-loading')).toBeInTheDocument();
  });

  it('useTrendingQuery hook returns data', async () => {
    const { result } = renderHook(() => useTrendingQuery('day'), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toBeDefined();
    });
  });
});
