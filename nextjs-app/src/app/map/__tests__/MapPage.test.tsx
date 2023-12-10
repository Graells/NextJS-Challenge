import { render, screen } from '@testing-library/react';
import MapPage from '../page';
import userEvent from '@testing-library/user-event';

describe('MapPage', () => {
  it('renders /map page, checking logo search and map sandbox are present', () => {
    //ARRANGE
    render(<MapPage />);
    // ACT
    const logo = screen.getByRole('img', { name: /brickbroLogo/i });
    const searchInput = screen.getByPlaceholderText('🔍 Address');
    const mapa = screen.getByTestId('mapSandbox');
    // ASSERT
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute(
      'src',
      '/_next/image?url=%2FbrickbroLogo.png&w=640&q=75',
    );
    expect(searchInput).toBeInTheDocument();
    expect(mapa).toBeInTheDocument();
  });
});
