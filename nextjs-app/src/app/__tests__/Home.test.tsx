/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';
import { useRouter } from 'next/navigation';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import userEvent from '@testing-library/user-event';

// ARRANGE ACT ASSERT
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    basePath: '',
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }),
}));

describe('Home', () => {
  const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;

  it('renders the BrickBro logo', () => {
    // ARRANGE
    render(<Home />);

    // ACT
    const logo = screen.getByRole('img', { name: /brickbroLogo/i });

    // ASSERT
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute(
      'src',
      '/_next/image?url=%2FbrickbroLogo.png&w=640&q=75',
    );
  });

  it('After user inputs a search and enters, should redirect to /map', async () => {
    // ARRANGE
    render(
      <AppRouterContext.Provider value={useRouterMock()}>
        <Home />
      </AppRouterContext.Provider>,
    );
    const searchInput = screen.getByPlaceholderText('🔍 Address');

    // ACT
    await userEvent.type(searchInput, 'Tokyo{enter}');

    // ASSERT
    await waitFor(() => {
      const mockRouter = useRouterMock();
      mockRouter.push('/map');
      expect(mockRouter.push).toHaveBeenCalledWith('/map');
    });
  });
});
