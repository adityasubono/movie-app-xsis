import Pagination from '@/components/molecules/Pagination';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Pagination component', () => {
  it('renders page elements', () => {
    const activePage = 3;
    const pages = 5;
    const setActivePage = vi.fn();

    render(
      <Pagination
        activePage={activePage}
        pages={pages}
        setActivePage={setActivePage}
      />,
    );

    const pageElements = screen.getAllByRole('button');

    expect(pageElements).toHaveLength(pages + 2); // Total pages + Previous and Next buttons
    expect(pageElements[0]).toHaveAttribute('data-testid'); // Previous button
    expect(pageElements[pages + 1]).toHaveAttribute('data-testid'); // Next button

    for (let i = 1; i <= pages; i++) {
      expect(pageElements[i]).toHaveTextContent(
        i < 10 ? `0${i}` : i.toString(),
      );
    }
  });

  // eslint-disable-next-line vitest/no-commented-out-tests
  //   it('calls setActivePage function with correct value when a page element is clicked', () => {
  //     const activePage = 3;
  //     const pages = 5;
  //     const setActivePage = vi.fn();

  //     render(
  //       <Pagination
  //         activePage={activePage}
  //         pages={pages}
  //         setActivePage={setActivePage}
  //       />,
  //     );

  //     const pageElements = screen.getAllByRole('button');

  //     fireEvent.click(pageElements[2]); // Click on the second page element

  //     expect(setActivePage).toHaveBeenCalledWith(1);
  //   });

  it('does not call setActivePage function when the previous button is clicked on the first page', () => {
    const activePage = 1;
    const pages = 5;
    const setActivePage = vi.fn();

    render(
      <Pagination
        activePage={activePage}
        pages={pages}
        setActivePage={setActivePage}
      />,
    );

    const previousButton = screen.getByTestId('pagination-previous');

    fireEvent.click(previousButton);

    expect(setActivePage).not.toHaveBeenCalled();
  });

  it('does not call setActivePage function when the next button is clicked on the last page', () => {
    const activePage = 5;
    const pages = 5;
    const setActivePage = vi.fn();

    render(
      <Pagination
        activePage={activePage}
        pages={pages}
        setActivePage={setActivePage}
      />,
    );

    const nextButton = screen.getByTestId('pagination-next');

    fireEvent.click(nextButton);

    expect(setActivePage).not.toHaveBeenCalled();
  });
});
