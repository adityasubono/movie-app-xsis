import { render, screen } from '@testing-library/react';
import PageTitle from '@/components/atoms/PageTitle';

test('renders PageTitle component', () => {
  const title = 'Home';
  const icon = 'home-icon';

  render(<PageTitle title={title} />);
  const pageTitle = screen.getByText(title);
  const homeIcon = screen.getByTestId(icon);
  expect(pageTitle).toBeInTheDocument();
  expect(homeIcon).toBeInTheDocument();
});
