/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import Loader from '@/components/atoms/Loader';

test('renders Loader component', () => {
  render(<Loader />);
  const loaderContainer = screen.getByTestId('loader-container');
  const loaderIcon = screen.getByTestId('loader-icon');
  expect(loaderContainer).toBeInTheDocument();
  expect(loaderIcon).toBeInTheDocument();
  expect(loaderIcon).toHaveClass('tw-h-8 tw-w-8 tw-animate-spin');
});
