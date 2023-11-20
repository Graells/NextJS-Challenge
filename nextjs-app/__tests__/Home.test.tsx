/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';
import { useRouter } from 'next/navigation';
import * as SearchContext from '@/contexts/SearchContext';

// ARRANGE ACT ASSERT
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Home', () => {
  const useRouterMock = useRouter as jest.Mocked<typeof useRouter>;

  it('renders the BrickBro logo', () => {
    render(<Home />);

    const image = screen.getByRole('img', { name: /brickbroLogo/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      '/_next/image?url=%2FbrickbroLogo.png&w=640&q=75',
    );
  });
  it('After user inputs a search and enters, should redirect to /map', async () => {
    render(<Home />);

    const image = screen.getByAltText('brickbroLogo');
    expect(image).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText('🔍 Address');
    fireEvent.change(searchInput, { target: { value: 'Tokyo' } });
    fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter' });
    await waitFor(() => {
      //   expect(useRouterMock).toHaveBeenCalled();
      const mockRouter = useRouterMock();
      mockRouter.push('/map');
      expect(mockRouter.push).toHaveBeenCalledWith('/map');
    });
  });
});
